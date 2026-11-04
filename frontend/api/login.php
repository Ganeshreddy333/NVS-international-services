<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

require_method('POST');
require_csrf();
$input = request_data();
$username = trim(request_string($input, 'username'));
$password = request_string($input, 'password');
if ($username === '' || $password === '' || strlen($username) > 100 || strlen($password) > 1024) {
    respond(['error' => 'Enter a valid username and password.'], 400);
}

try {
    $statement = database()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = :username LIMIT 1');
    $statement->execute(['username' => $username]);
    $user = $statement->fetch();
} catch (Throwable $error) {
    error_log('NVS admin login failed: ' . $error->getMessage());
    respond(['error' => 'Login is unavailable. Check the database configuration.'], 503);
}

if (!$user || !password_verify($password, $user['password_hash'])) {
    respond(['error' => 'The username or password is incorrect.'], 401);
}

session_regenerate_id(true);
$_SESSION['admin_id'] = (int)$user['id'];
$_SESSION['admin_username'] = $user['username'];
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
respond([
    'username' => $user['username'],
    'csrfToken' => $_SESSION['csrf_token'],
]);
