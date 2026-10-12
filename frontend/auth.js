const adminSessionKey = 'nvs-admin-session';

function hasAdminSession() {
  return sessionStorage.getItem(adminSessionKey) === 'authenticated';
}

function showAdminApp() {
  document.querySelector('#admin-login')?.classList.add('is-hidden');
  document.querySelector('#admin-app')?.classList.remove('is-hidden');
}

function showAdminLogin() {
  document.querySelector('#admin-login')?.classList.remove('is-hidden');
  document.querySelector('#admin-app')?.classList.add('is-hidden');
}

function bindAdminAuthentication() {
  const loginForm = document.querySelector('#admin-login-form');
  const loginError = document.querySelector('#admin-login-error');
  const logoutButton = document.querySelector('#admin-logout');
  const settingsLogoutButton = document.querySelector('#settings-logout');

  if (hasAdminSession()) showAdminApp();
  else showAdminLogin();

  loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.querySelector('#admin-username').value.trim();
    const password = document.querySelector('#admin-password').value;

    if (window.NVS_API && NVS_API.login) {
      try {
        await NVS_API.login(username, password);
        loginError.textContent = '';
        loginForm.reset();
        sessionStorage.setItem(adminSessionKey, 'authenticated');
        showAdminApp();
        window.dispatchEvent(new Event('admin-authenticated'));
        return;
      } catch (error) {
        if (NVS_API.hasToken()) NVS_API.clearToken();
        loginError.textContent = error.message || 'Could not connect to the authentication service.';
        return;
      }
    }
    loginError.textContent = 'The authentication service is not configured.';
  });

  logoutButton?.addEventListener('click', () => {
    sessionStorage.removeItem(adminSessionKey);
    if (window.NVS_API && NVS_API.clearToken) NVS_API.clearToken();
    showAdminLogin();
  });
  settingsLogoutButton?.addEventListener('click', () => {
    sessionStorage.removeItem(adminSessionKey);
    if (window.NVS_API && NVS_API.clearToken) NVS_API.clearToken();
    showAdminLogin();
  });
}

bindAdminAuthentication();
