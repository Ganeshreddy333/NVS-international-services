<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'GET') {
    try {
        $statement = database()->query('SELECT data FROM site_content WHERE id = 1');
        $row = $statement->fetch();
        $storedData = $row ? (string)$row['data'] : '{}';
        $content = json_decode($storedData, true, 64, JSON_THROW_ON_ERROR);
        if (!is_array($content)) {
            throw new UnexpectedValueException('Stored content must be a JSON object.');
        }
        $content = sanitize_content($content);
        if (array_key_exists('recruitment', $content)) {
            $content['recruitment'] = public_recruitment_list($content['recruitment']);
        }
        if (array_key_exists('partnershipSection', $content)) {
            $section = normalize_partnership_section($content['partnershipSection']);
            $content['partnershipSection'] = public_partnership_version($section['published'] ?? null);
        }
        $responseBody = json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        $etag = '"' . hash('sha256', $responseBody) . '"';
        header('ETag: ' . $etag);
        header('Vary: If-None-Match');
        $providedEtags = array_map('trim', explode(',', $_SERVER['HTTP_IF_NONE_MATCH'] ?? ''));
        if (in_array('*', $providedEtags, true) || in_array($etag, $providedEtags, true) || in_array('W/' . $etag, $providedEtags, true)) {
            http_response_code(304);
            exit;
        }
        echo $responseBody;
        exit;
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
$incoming = request_data(10_000_000);
if (array_key_exists('recruitment', $incoming)) {
    normalize_recruitment_list($incoming['recruitment']);
}
if (array_key_exists('partnershipSection', $incoming)) {
    normalize_partnership_section($incoming['partnershipSection']);
}
$content = sanitize_content($incoming);
if (array_key_exists('recruitment', $content)) {
    $content['recruitment'] = normalize_recruitment_list($content['recruitment']);
}
if (array_key_exists('partnershipSection', $content)) {
    $content['partnershipSection'] = normalize_partnership_section($content['partnershipSection']);
}
try {
    $connection = database();
    $connection->beginTransaction();
    $currentRow = $connection->query('SELECT data FROM site_content WHERE id = 1 FOR UPDATE')->fetch();
    $before = $currentRow ? json_decode($currentRow['data'], true, 64, JSON_THROW_ON_ERROR) : [];
    if (!is_array($before)) {
        throw new UnexpectedValueException('Stored content must be a JSON object.');
    }

    $changes = [];
    foreach (array_unique(array_merge(array_keys($before), array_keys($content))) as $key) {
        $previousValue = $before[$key] ?? null;
        $nextValue = $content[$key] ?? null;
        if (!array_key_exists($key, $before) || !array_key_exists($key, $content) || $previousValue !== $nextValue) {
            $changes[$key] = ['before' => $previousValue, 'after' => $nextValue];
        }
    }

    $statement = $connection->prepare(
        'INSERT INTO site_content (id, data) VALUES (1, :data) ON DUPLICATE KEY UPDATE data = VALUES(data)'
    );
    $statement->execute([
        'data' => json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
    ]);
    if ($changes) {
        record_admin_activity($connection, 'content.update', $changes);
    }
    $connection->commit();
    respond(['ok' => true]);
} catch (Throwable $error) {
    if (isset($connection) && $connection->inTransaction()) {
        $connection->rollBack();
    }
    error_log('NVS content save failed: ' . $error->getMessage());
    respond(['error' => 'Could not save website content.'], 500);
}
