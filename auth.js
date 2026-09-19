const adminCredentials = { username: 'Ganeshreddy', password: 'GaneshReddy@0333' };
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

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.querySelector('#admin-username').value.trim();
    const password = document.querySelector('#admin-password').value;
    if (username === adminCredentials.username && password === adminCredentials.password) {
      sessionStorage.setItem(adminSessionKey, 'authenticated');
      loginError.textContent = '';
      loginForm.reset();
      showAdminApp();
      window.dispatchEvent(new Event('admin-authenticated'));
    } else {
      loginError.textContent = 'The username or password is incorrect.';
    }
  });

  logoutButton?.addEventListener('click', () => {
    sessionStorage.removeItem(adminSessionKey);
    showAdminLogin();
  });
  settingsLogoutButton?.addEventListener('click', () => {
    sessionStorage.removeItem(adminSessionKey);
    showAdminLogin();
  });
}

bindAdminAuthentication();
