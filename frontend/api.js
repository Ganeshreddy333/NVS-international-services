// NVS International Services — front-end API client.
// Talks to the backend (backend/server.js). Falls back gracefully:
// if the API is unreachable, the site keeps using localStorage + defaults.
(function () {
  // Point this at your backend. Change to your deployed API URL in production.
  const API_BASE = window.NVS_API_BASE || 'http://127.0.0.1:4000';
  const TOKEN_KEY = 'nvs-admin-token';
  const DATA_KEY = 'nvs-site-data';

  const getToken = () => { try { return sessionStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } };
  const setToken = (t) => { try { sessionStorage.setItem(TOKEN_KEY, t); } catch (e) {} };
  const clearToken = () => { try { sessionStorage.removeItem(TOKEN_KEY); } catch (e) {} };

  async function login(username, password) {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Login failed');
    const out = await res.json();
    setToken(out.token);
    return out;
  }

  // Pull server content into localStorage so the existing (synchronous)
  // rendering code can read it as usual. Never throws.
  async function bootstrap() {
    try {
      const res = await fetch(`${API_BASE}/api/content`, { cache: 'no-store' });
      if (!res.ok) return false;
      const data = await res.json();
      if (data && typeof data === 'object') {
        try { localStorage.setItem(DATA_KEY, JSON.stringify(data)); } catch (e) {}
      }
      return true;
    } catch (e) {
      return false; // API down → keep whatever localStorage/defaults exist
    }
  }

  async function saveContent(data) {
    const res = await fetch(`${API_BASE}/api/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Could not save to server');
    return res.json();
  }

  async function postInquiry(inquiry) {
    const res = await fetch(`${API_BASE}/api/inquiries`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    });
    if (!res.ok) throw new Error('Could not submit enquiry');
    return res.json();
  }

  async function listInquiries() {
    const res = await fetch(`${API_BASE}/api/inquiries`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Could not load enquiries');
    return res.json();
  }

  async function deleteInquiry(id) {
    const res = await fetch(`${API_BASE}/api/inquiries/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Could not delete enquiry');
    return res.json();
  }

  window.NVS_API = {
    API_BASE, bootstrap, login, saveContent,
    postInquiry, listInquiries, deleteInquiry,
    getToken, setToken, clearToken, hasToken: () => !!getToken()
  };
})();
