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
$uploadDirectory = getenv('NVS_UPLOAD_DIR') ?: dirname(__DIR__) . '/frontend/uploads/gallery';

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['db_host'], (int)($config['db_port'] ?? 3306), $config['db_name']),
        $config['db_user'],
        $config['db_password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]
    );
    $row = $pdo->query('SELECT data FROM site_content WHERE id = 1')->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        fwrite(STDOUT, "No site content row needs migration.\n");
        exit(0);
    }
    $content = json_decode($row['data'], true, 64, JSON_THROW_ON_ERROR);
    $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp'];
    $migrated = 0;
    $convert = function (&$value) use (&$convert, &$migrated, $extensions, $uploadDirectory): void {
        if (is_array($value)) {
            foreach ($value as &$child) {
                $convert($child);
            }
            unset($child);
            return;
        }
        if (!is_string($value) || !preg_match('/^data:image\/(?:jpeg|png|gif|webp);base64,(.+)$/s', $value, $matches)) {
            return;
        }
        $bytes = base64_decode($matches[1], true);
        $image = $bytes === false ? false : getimagesizefromstring($bytes);
        $mime = $image['mime'] ?? '';
        if (!$bytes || strlen($bytes) > 25 * 1024 * 1024 || !$image || !isset($extensions[$mime])) {
            throw new RuntimeException('Found an invalid or oversized embedded image; database content was not updated.');
        }
        if (!is_dir($uploadDirectory) && !mkdir($uploadDirectory, 0755, true) && !is_dir($uploadDirectory)) {
            throw new RuntimeException('Could not create frontend/uploads/gallery.');
        }
        $filename = bin2hex(random_bytes(20)) . '.' . $extensions[$mime];
        if (file_put_contents($uploadDirectory . '/' . $filename, $bytes, LOCK_EX) === false) {
            throw new RuntimeException('Could not write a migrated gallery image.');
        }
        $value = '/uploads/gallery/' . $filename;
        $migrated++;
    };
    $convert($content);
    if ($migrated > 0) {
        $statement = $pdo->prepare('UPDATE site_content SET data = :data WHERE id = 1');
        $statement->execute(['data' => json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
    }
    fwrite(STDOUT, sprintf("Migrated %d embedded gallery image(s).\n", $migrated));
} catch (Throwable $error) {
    fwrite(STDERR, 'Gallery migration failed: ' . $error->getMessage() . "\n");
    exit(1);
}
