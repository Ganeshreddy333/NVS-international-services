<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'POST') {
    require_csrf();
    $input = request_data();
    $name = trim(request_string($input, 'name'));
    $email = trim(request_string($input, 'email'));
    $phone = trim(request_string($input, 'phone'));
    $subject = trim(request_string($input, 'subject'));
    $message = trim(request_string($input, 'message'));
    if (!$name || !$email || !$phone || !$subject || !$message) {
        respond(['error' => 'Name, email, phone, subject, and message are required.'], 400);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(['error' => 'Enter a valid email address.'], 400);
    }
    $length = static fn(string $value): int => function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
    if ($length($name) > 150 || $length($email) > 200 || $length($phone) > 60 || $length($subject) > 255 || $length($message) > 5000) {
        respond(['error' => 'One or more enquiry fields exceed the allowed length.'], 400);
    }
    try {
        $statement = database()->prepare(
            'INSERT INTO inquiries (name, email, phone, subject, message) VALUES (:name, :email, :phone, :subject, :message)'
        );
        $statement->execute(compact('name', 'email', 'phone', 'subject', 'message'));
        respond(['ok' => true, 'id' => (int)database()->lastInsertId()], 201);
    } catch (Throwable $error) {
        error_log('NVS inquiry save failed: ' . $error->getMessage());
        respond(['error' => 'Could not submit your enquiry. Please try again later.'], 500);
    }
}

if ($method === 'GET') {
    require_admin();
    try {
        $rows = database()->query('SELECT id, name, email, phone, subject, message, created_at FROM inquiries ORDER BY created_at DESC')->fetchAll();
        respond($rows);
    } catch (Throwable $error) {
        error_log('NVS inquiry load failed: ' . $error->getMessage());
        respond(['error' => 'Could not load enquiries.'], 500);
    }
}

if ($method === 'DELETE') {
    require_admin();
    require_csrf();
    $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if (!$id) {
        respond(['error' => 'A valid enquiry id is required.'], 400);
    }
    try {
        $connection = database();
        $connection->beginTransaction();
        $lookup = $connection->prepare('SELECT id FROM inquiries WHERE id = :id FOR UPDATE');
        $lookup->execute(['id' => $id]);
        $existing = $lookup->fetch();
        if ($existing) {
            $statement = $connection->prepare('DELETE FROM inquiries WHERE id = :id');
            $statement->execute(['id' => $id]);
            record_admin_activity($connection, 'inquiry.delete', [
                'inquiry' => ['before' => ['id' => (int)$id], 'after' => null],
            ]);
        }
        $connection->commit();
        respond(['ok' => true]);
    } catch (Throwable $error) {
        if (isset($connection) && $connection->inTransaction()) {
            $connection->rollBack();
        }
        error_log('NVS inquiry delete failed: ' . $error->getMessage());
        respond(['error' => 'Could not delete the enquiry.'], 500);
    }
}

header('Allow: GET, POST, DELETE');
respond(['error' => 'Method not allowed'], 405);
