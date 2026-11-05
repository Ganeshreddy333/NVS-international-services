<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

require_method('GET');
require_admin();

try {
    $statement = database()->query(
        'SELECT id, admin_username, action, changes, created_at
         FROM admin_audit_log
         ORDER BY created_at DESC, id DESC
         LIMIT 50'
    );
    $rows = $statement->fetchAll();
    foreach ($rows as &$row) {
        $row['changes'] = json_decode($row['changes'], true, 64, JSON_THROW_ON_ERROR);
    }
    unset($row);
    respond($rows);
} catch (Throwable $error) {
    error_log('NVS audit log load failed: ' . $error->getMessage());
    respond(['error' => 'Could not load admin activity.'], 500);
}
