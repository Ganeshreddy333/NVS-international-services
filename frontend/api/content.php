<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'GET') {
    try {
        $statement = database()->query('SELECT data FROM site_content WHERE id = 1');
        $row = $statement->fetch();
        $content = $row ? json_decode($row['data'], true, 64, JSON_THROW_ON_ERROR) : [];
        if (!is_array($content)) {
            throw new UnexpectedValueException('Stored content must be a JSON object.');
        }
        respond(sanitize_content($content));
    } catch (Throwable $error) {
        error_log('NVS content load failed: ' . $error->getMessage());
        respond(['error' => 'Could not load website content.'], 500);
    }
}
if ($method !== 'PUT') {
    header('Allow: GET, PUT');
    respond(['error' => 'Method not allowed'], 405);
}

require_admin();
require_csrf();
$content = sanitize_content(request_data());
try {
    $statement = database()->prepare(
        'INSERT INTO site_content (id, data) VALUES (1, :data) ON DUPLICATE KEY UPDATE data = VALUES(data)'
    );
    $statement->execute([
        'data' => json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
    ]);
    respond(['ok' => true]);
} catch (Throwable $error) {
    error_log('NVS content save failed: ' . $error->getMessage());
    respond(['error' => 'Could not save website content.'], 500);
}
