<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

require_method('GET');
respond([
    'csrfToken' => csrf_token(),
    'authenticated' => isset($_SESSION['admin_id']),
    'username' => $_SESSION['admin_username'] ?? null,
]);
