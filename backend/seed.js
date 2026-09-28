// Creates/updates the admin account (from .env) and makes sure the
// single site_content row exists. Safe to run repeatedly.
//   Usage:  npm run seed
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

async function seed() {
  const username = (process.env.ADMIN_USERNAME || 'Ganeshreddy').trim();
  const password = process.env.ADMIN_PASSWORD || '';

  if (!password || password === 'set_a_strong_password_here') {
    console.error('ERROR: set a real ADMIN_PASSWORD in backend/.env before seeding.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [username, passwordHash]
  );

  await pool.query(
    `INSERT INTO site_content (id, data) VALUES (1, '{}')
       ON DUPLICATE KEY UPDATE id = id`
  );

  console.log(`Seeded admin user "${username}" and initialised site_content.`);
  await pool.end();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
