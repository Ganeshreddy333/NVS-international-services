// Same-origin PHP API client. Admin mutations require a PHP session and CSRF token.
(function () {
  const DATA_KEY = 'nvs-site-data';
  let csrfToken = '';
  let authenticated = false;
  let bootstrapPromise;

  async function request(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      cache: 'no-store',
      ...options
    });
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('The PHP API did not return JSON. Serve the site with PHP, not a static-only server.');
    }
    let payload;
    try {
      payload = await response.json();
    } catch (error) {
      throw new Error('The PHP API returned invalid JSON.');
    }
    if (!response.ok) {
      throw new Error(payload.error || `Request failed (${response.status})`);
    }
    return payload;
  }

  async function refreshSession() {
    const session = await request('api/session.php');
    csrfToken = session.csrfToken;
    authenticated = session.authenticated === true;
    return session;
  }

  async function ensureCsrfToken() {
    if (!csrfToken) await refreshSession();
  }

  function bootstrap() {
    if (!bootstrapPromise) {
      bootstrapPromise = (async () => {
        try {
          await refreshSession();
          const data = await request('api/content.php');
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            localStorage.setItem(DATA_KEY, JSON.stringify(data));
          }
          return true;
        } catch (error) {
          console.error(`Could not load shared website content: ${error.message}`);
          return false;
        }
      })();
    }
    return bootstrapPromise;
  }

  async function login(username, password) {
    await ensureCsrfToken();
    const result = await request('api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify({ username, password })
    });
    csrfToken = result.csrfToken;
    authenticated = true;
    return result;
  }

  async function logout() {
    await ensureCsrfToken();
    await request('api/logout.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfToken }
    });
    authenticated = false;
    csrfToken = '';
  }

  async function saveContent(data) {
    await ensureCsrfToken();
    return request('api/content.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify(data)
    });
  }

  async function postInquiry(inquiry) {
    await ensureCsrfToken();
    return request('api/inquiries.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
      body: JSON.stringify(inquiry)
    });
  }

  async function listInquiries() {
    return request('api/inquiries.php');
  }

  async function deleteInquiry(id) {
    await ensureCsrfToken();
    return request(`api/inquiries.php?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-Token': csrfToken }
    });
  }

  async function uploadImage(file) {
    await ensureCsrfToken();
    const body = new FormData();
    body.append('file', file, file.name);
    return request('api/upload.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfToken },
      body
    });
  }

  window.NVS_API = {
    bootstrap,
    login,
    logout,
    saveContent,
    postInquiry,
    listInquiries,
    deleteInquiry,
    uploadImage,
    hasToken: () => authenticated
  };
})();
