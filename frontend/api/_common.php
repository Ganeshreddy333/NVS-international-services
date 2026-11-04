<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Cache-Control: no-store');

$isHttps = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== '' && $_SERVER['HTTPS'] !== 'off';
session_name('nvs_admin_session');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== $method) {
        header('Allow: ' . $method);
        respond(['error' => 'Method not allowed'], 405);
    }
}

function request_data(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 2_000_000) {
        respond(['error' => 'Request body is too large'], 413);
    }
    if (!str_starts_with(ltrim($raw), '{')) {
        respond(['error' => 'Request body must be a JSON object'], 400);
    }
    try {
        $data = json_decode($raw, true, 64, JSON_THROW_ON_ERROR);
    } catch (JsonException $error) {
        respond(['error' => 'Request body must contain valid JSON'], 400);
    }
    if (!is_array($data)) {
        respond(['error' => 'Request body must be a JSON object'], 400);
    }
    return $data;
}

function request_string(array $input, string $key): string
{
    $value = $input[$key] ?? '';
    if (!is_string($value) && !is_int($value) && !is_float($value)) {
        respond(['error' => 'Invalid value for ' . $key . '.'], 400);
    }
    return (string)$value;
}

function csrf_token(): string
{
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function require_csrf(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($provided) || !hash_equals(csrf_token(), $provided)) {
        respond(['error' => 'Your session expired. Refresh the page and try again.'], 403);
    }
}

function require_admin(): void
{
    if (!isset($_SESSION['admin_id'])) {
        respond(['error' => 'Please sign in again.'], 401);
    }
}

function database(): PDO
{
    static $connection;
    if ($connection instanceof PDO) {
        return $connection;
    }

    $configPath = __DIR__ . '/config.php';
    if (!is_file($configPath)) {
        respond(['error' => 'Database configuration is missing. Create api/config.php from config.example.php.'], 503);
    }
    $config = require $configPath;
    foreach (['db_host', 'db_name', 'db_user', 'db_password'] as $key) {
        if (!isset($config[$key]) || !is_string($config[$key]) || $config[$key] === '') {
            respond(['error' => 'Database configuration is incomplete.'], 503);
        }
    }

    $port = (int)($config['db_port'] ?? 3306);
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        $port,
        $config['db_name']
    );
    try {
        $connection = new PDO($dsn, $config['db_user'], $config['db_password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $error) {
        error_log('NVS database connection failed: ' . $error->getMessage());
        respond(['error' => 'The database is unavailable. Check the server configuration.'], 503);
    }
    return $connection;
}

function safe_link(string $url): bool
{
    $url = trim($url);
    if ($url === '' || preg_match('/[\x00-\x20\\\\]/', $url) || str_starts_with($url, '//')) {
        return false;
    }
    if (!preg_match('/^[a-z][a-z0-9+.-]*:/i', $url)) {
        return true;
    }
    $scheme = strtolower((string)parse_url($url, PHP_URL_SCHEME));
    return in_array($scheme, ['http', 'https', 'mailto', 'tel'], true);
}

function clean_html_node(DOMElement $element): void
{
    $allowed = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'a', 'span', 'img'];
    $dangerous = ['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math', 'form'];
    $children = [];
    foreach ($element->childNodes as $child) {
        $children[] = $child;
    }

    foreach ($children as $child) {
        if (!$child instanceof DOMElement) {
            if ($child instanceof DOMComment) {
                $element->removeChild($child);
            }
            continue;
        }

        $tag = strtolower($child->tagName);
        if (!in_array($tag, $allowed, true)) {
            if (in_array($tag, $dangerous, true)) {
                $element->removeChild($child);
            } else {
                clean_html_node($child);
                while ($child->firstChild) {
                    $element->insertBefore($child->firstChild, $child);
                }
                $element->removeChild($child);
            }
            continue;
        }

        $href = $tag === 'a' ? $child->getAttribute('href') : '';
        $src = $tag === 'img' ? $child->getAttribute('src') : '';
        $alt = $tag === 'img' ? $child->getAttribute('alt') : '';
        $attributes = [];
        foreach ($child->attributes as $attribute) {
            $attributes[] = $attribute->name;
        }
        foreach ($attributes as $attribute) {
            if (!(($tag === 'a' && $attribute === 'href') || ($tag === 'img' && in_array($attribute, ['src', 'alt'], true)))) {
                $child->removeAttribute($attribute);
            }
        }
        if ($tag === 'a') {
            if (!safe_link($href)) {
                $child->removeAttribute('href');
            } elseif (preg_match('/^https?:/i', $href)) {
                $child->setAttribute('rel', 'noopener noreferrer');
            }
        }
        if ($tag === 'img') {
            if (!preg_match('#^/?uploads/gallery/[a-f0-9]+\.(?:jpg|png|gif|webp)$#i', $src)) {
                $element->removeChild($child);
                continue;
            }
            $child->setAttribute('src', $src);
            $child->setAttribute('alt', $alt);
        }
        clean_html_node($child);
    }
}

function sanitize_content(mixed $value): mixed
{
    if (is_array($value)) {
        foreach ($value as $key => $child) {
            if (in_array((string)$key, ['href', 'linkedinUrl'], true) && is_string($child) && !safe_link($child)) {
                $value[$key] = '';
                continue;
            }
            $value[$key] = sanitize_content($child);
        }
        return $value;
    }
    if (!is_string($value) || !preg_match('/<[^>]+>/', $value)) {
        return $value;
    }
    if (!class_exists(DOMDocument::class)) {
        throw new RuntimeException('The PHP DOM extension is required to sanitize rich text.');
    }

    $document = new DOMDocument('1.0', 'UTF-8');
    $previous = libxml_use_internal_errors(true);
    $document->loadHTML('<?xml encoding="UTF-8"><div id="nvs-sanitize-root">' . $value . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    $root = $document->getElementById('nvs-sanitize-root');
    if (!$root) {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
    clean_html_node($root);
    $html = '';
    foreach ($root->childNodes as $child) {
        $html .= $document->saveHTML($child);
    }
    return $html;
}
