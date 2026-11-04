<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

require_method('POST');
require_admin();
require_csrf();

$file = $_FILES['file'] ?? null;
if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    respond(['error' => 'Select an image that is smaller than the server upload limit.'], 400);
}
if (($file['size'] ?? 0) < 1 || $file['size'] > 5 * 1024 * 1024 || !is_uploaded_file($file['tmp_name'])) {
    respond(['error' => 'Images must be no larger than 5 MB.'], 413);
}

$image = @getimagesize($file['tmp_name']);
$mime = $image['mime'] ?? '';
$extensions = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/gif' => 'gif',
    'image/webp' => 'webp',
];
if (!$image || !isset($extensions[$mime])) {
    respond(['error' => 'Only valid JPEG, PNG, GIF, or WebP images are allowed.'], 415);
}

$directory = dirname(__DIR__) . '/uploads/gallery';
if (!is_dir($directory) && !mkdir($directory, 0755, true) && !is_dir($directory)) {
    error_log('NVS could not create the gallery upload directory.');
    respond(['error' => 'The image upload directory is unavailable.'], 500);
}
$filename = bin2hex(random_bytes(20)) . '.' . $extensions[$mime];
if (!move_uploaded_file($file['tmp_name'], $directory . '/' . $filename)) {
    error_log('NVS could not move an uploaded gallery image.');
    respond(['error' => 'Could not save the image.'], 500);
}

respond(['location' => '/uploads/gallery/' . $filename]);
