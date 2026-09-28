// NVS International Services — API server (Express + MySQL)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET === 'change_this_to_a_long_random_string') {
  console.error('ERROR: set a real JWT_SECRET in backend/.env before starting.');
  process.exit(1);
}

const app = express();
app.use(express.json({ limit: '25mb' })); // room for base64 gallery images

// Only allow the configured website origins to call the API.
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',').map((value) => value.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  }
}));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const inquiryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });

// Verify the Bearer token issued at login; gate admin-only routes.
function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

// --- Admin login: returns a JWT valid for 12 hours ---
app.post('/api/login', loginLimiter, async (req, res) => {
  try {
    const { username = '', password = '' } = req.body || {};
    const [rows] = await pool.query(
      'SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1',
      [String(username).trim()]
    );
    const user = rows[0];
    const ok = user && await bcrypt.compare(String(password), user.password_hash);
    if (!ok) return res.status(401).json({ error: 'The username or password is incorrect.' });

    const token = jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- Site content (the editable JSON document) ---
app.get('/api/content', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT data FROM site_content WHERE id = 1');
    res.json(rows[0] ? rows[0].data : {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not load content' });
  }
});

app.put('/api/content', requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return res.status(400).json({ error: 'Body must be a JSON object' });
    }
    await pool.query(
      `INSERT INTO site_content (id, data) VALUES (1, ?)
         ON DUPLICATE KEY UPDATE data = VALUES(data)`,
      [JSON.stringify(data)]
    );
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save content' });
  }
});

// --- Enquiries: visitors POST; admin lists / deletes ---
app.post('/api/inquiries', inquiryLimiter, async (req, res) => {
  try {
    const { name = '', email = '', phone = '', subject = '', message = '' } = req.body || {};
    if (!String(name).trim() || !String(email).trim()) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO inquiries (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [String(name).slice(0, 150), String(email).slice(0, 200), String(phone).slice(0, 60),
       String(subject).slice(0, 255), String(message).slice(0, 5000)]
    );
    res.status(201).json({ ok: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not submit enquiry' });
  }
});

app.get('/api/inquiries', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not load enquiries' });
  }
});

app.delete('/api/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM inquiries WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete enquiry' });
  }
});

app.listen(PORT, () => console.log(`NVS API running on http://127.0.0.1:${PORT}`));

module.exports = app;
