<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$configPath = getenv('NVS_CONFIG_FILE') ?: dirname(__DIR__) . '/frontend/api/config.php';
if (!is_file($configPath)) {
    fwrite(STDERR, "Create frontend/api/config.php before running this script.\n");
    exit(1);
}
$config = require $configPath;
try {
    fwrite(STDOUT, 'Admin username: ');
    $username = trim((string)fgets(STDIN));
    if ($username === '' || strlen($username) > 100) {
        throw new RuntimeException('Username must be between 1 and 100 characters.');
    }

    fwrite(STDOUT, 'Admin password: ');
    $terminalState = function_exists('shell_exec') ? shell_exec('stty -g 2>/dev/null') : false;
    if (is_string($terminalState) && trim($terminalState) !== '') {
        shell_exec('stty -echo');
        try {
            $passwordLine = fgets(STDIN);
        } finally {
            shell_exec('stty ' . escapeshellarg(trim($terminalState)));
            fwrite(STDOUT, "\n");
        }
    } else {
        $passwordLine = fgets(STDIN);
    }
    $password = rtrim((string)$passwordLine, "\r\n");
    if (strlen($password) < 12 || strlen($password) > 1024) {
        throw new RuntimeException('Use a password between 12 and 1024 characters.');
    }

    $pdo = new PDO(
        sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['db_host'], (int)($config['db_port'] ?? 3306), $config['db_name']),
        $config['db_user'],
        $config['db_password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]
    );
    $statement = $pdo->prepare(
        'INSERT INTO admin_users (username, password_hash) VALUES (:username, :password_hash)
         ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
    );
    $statement->execute(['username' => $username, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)]);
    $pdo->exec("INSERT INTO site_content (id, data) VALUES (1, '{}') ON DUPLICATE KEY UPDATE id = id");
    fwrite(STDOUT, "Admin account saved.\n");
} catch (Throwable $error) {
    fwrite(STDERR, 'Admin setup failed: ' . $error->getMessage() . "\n");
    exit(1);
}
