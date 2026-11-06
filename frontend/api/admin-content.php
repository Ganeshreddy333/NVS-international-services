<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

require_method('GET');
require_admin();

try {
    $statement = database()->query('SELECT data FROM site_content WHERE id = 1');
    $row = $statement->fetch();
    $storedData = $row ? (string)$row['data'] : '{}';
    $content = json_decode($storedData, true, 64, JSON_THROW_ON_ERROR);
    if (!is_array($content)) {
        throw new UnexpectedValueException('Stored content must be a JSON object.');
    }
    $content = sanitize_content($content);
    if (array_key_exists('partnershipSection', $content)) {
        $content['partnershipSection'] = normalize_partnership_section($content['partnershipSection']);
    }
    respond($content);
} catch (Throwable $error) {
    error_log('NVS admin content load failed: ' . $error->getMessage());
    respond(['error' => 'Could not load admin website content.'], 500);
}
