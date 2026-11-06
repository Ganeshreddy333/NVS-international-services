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

function request_data(int $maxBytes = 2_000_000): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > $maxBytes) {
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

function record_admin_activity(PDO $connection, string $action, array $changes): void
{
    $statement = $connection->prepare(
        'INSERT INTO admin_audit_log (admin_id, admin_username, action, changes)
         VALUES (:admin_id, :admin_username, :action, :changes)'
    );
    $statement->execute([
        'admin_id' => $_SESSION['admin_id'] ?? null,
        'admin_username' => $_SESSION['admin_username'] ?? 'unknown',
        'action' => $action,
        'changes' => json_encode($changes, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
    ]);
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

function valid_website_url(string $url): bool
{
    if (strlen($url) > 2048 || !filter_var($url, FILTER_VALIDATE_URL)) {
        return false;
    }
    $scheme = strtolower((string)parse_url($url, PHP_URL_SCHEME));
    return in_array($scheme, ['http', 'https'], true)
        && is_string(parse_url($url, PHP_URL_HOST))
        && parse_url($url, PHP_URL_USER) === null
        && parse_url($url, PHP_URL_PASS) === null;
}

function valid_partnership_image(string $url): bool
{
    return preg_match('#^/?uploads/gallery/[a-f0-9]{40}\.(?:jpg|png|gif|webp)$#i', $url) === 1;
}

function recruitment_string(mixed $value, string $key, int $maxLength): string
{
    if (!is_string($value) || strlen($value) > $maxLength) {
        respond(['error' => 'Invalid value for recruitment ' . $key . '.'], 400);
    }
    return trim($value);
}

function normalize_recruitment_list(mixed $value): array
{
    if (!is_array($value) || count($value) > 100) {
        respond(['error' => 'Recruitment listings must be a list of no more than 100 vacancies.'], 400);
    }

    $list = [];
    $ids = [];
    $employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
    $fields = [
        'title' => 240,
        'department' => 160,
        'description' => 10000,
        'responsibilities' => 10000,
        'qualifications' => 10000,
        'experience' => 3000,
        'skills' => 5000,
        'employmentType' => 30,
        'location' => 240,
        'salary' => 240,
        'deadline' => 10,
        'applicationInstructions' => 5000,
        'applicationUrl' => 2048,
        'applicationEmail' => 254,
        'createdAt' => 40,
        'updatedAt' => 40,
    ];

    foreach ($value as $item) {
        if (!is_array($item)) {
            respond(['error' => 'Invalid recruitment listing.'], 400);
        }
        $id = recruitment_string($item['id'] ?? '', 'listing ID', 100);
        if ($id === '' || in_array($id, $ids, true)) {
            respond(['error' => 'Recruitment listing IDs must be unique and non-empty.'], 400);
        }
        $ids[] = $id;

        $listing = ['id' => $id];
        foreach ($fields as $key => $limit) {
            $listing[$key] = recruitment_string($item[$key] ?? '', $key, $limit);
        }
        $listing['employmentType'] = $listing['employmentType'] ?: 'Full-time';
        if (!in_array($listing['employmentType'], $employmentTypes, true)) {
            respond(['error' => 'Choose a valid recruitment employment type.'], 400);
        }
        $vacancies = $item['vacancies'] ?? 1;
        if (!is_int($vacancies) || $vacancies < 1 || $vacancies > 10000) {
            respond(['error' => 'Number of vacancies must be between 1 and 10000.'], 400);
        }
        $listing['vacancies'] = $vacancies;

        if ($listing['deadline'] !== '') {
            $deadline = DateTimeImmutable::createFromFormat('!Y-m-d', $listing['deadline']);
            if (!$deadline || $deadline->format('Y-m-d') !== $listing['deadline']) {
                respond(['error' => 'Application deadlines must use the YYYY-MM-DD format.'], 400);
            }
        }
        if ($listing['applicationUrl'] !== '' && !valid_website_url($listing['applicationUrl'])) {
            respond(['error' => 'Application URLs must be valid HTTP or HTTPS links.'], 400);
        }
        if ($listing['applicationEmail'] !== '' && !filter_var($listing['applicationEmail'], FILTER_VALIDATE_EMAIL)) {
            respond(['error' => 'Enter a valid application email address.'], 400);
        }

        $status = $item['status'] ?? 'draft';
        if (!is_string($status) || !in_array($status, ['draft', 'published'], true)) {
            respond(['error' => 'Recruitment status must be draft or published.'], 400);
        }
        if ($status === 'published' && $listing['applicationUrl'] === '' && $listing['applicationEmail'] === '') {
            respond(['error' => 'Add an application URL or email address before publishing a vacancy.'], 400);
        }
        $listing['status'] = $status;
        $listing['createdAt'] = $listing['createdAt'] ?: gmdate('c');
        $listing['updatedAt'] = $listing['updatedAt'] ?: $listing['createdAt'];
        $list[] = $listing;
    }

    return $list;
}

function public_recruitment_list(mixed $value): array
{
    if (!is_array($value)) {
        return [];
    }
    $today = gmdate('Y-m-d');
    $publicListings = [];
    $allowedFields = array_fill_keys([
        'id', 'title', 'department', 'description', 'responsibilities', 'qualifications',
        'experience', 'skills', 'employmentType', 'vacancies', 'location', 'salary',
        'deadline', 'applicationInstructions', 'applicationUrl', 'applicationEmail',
        'status', 'createdAt', 'updatedAt',
    ], true);
    foreach ($value as $item) {
        if (!is_array($item) || ($item['status'] ?? '') !== 'published' || trim((string)($item['title'] ?? '')) === '') {
            continue;
        }
        $deadline = (string)($item['deadline'] ?? '');
        if ($deadline !== '' && (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $deadline) || $deadline < $today)) {
            continue;
        }
        $url = (string)($item['applicationUrl'] ?? '');
        $email = (string)($item['applicationEmail'] ?? '');
        $validUrl = $url !== '' && valid_website_url($url);
        $validEmail = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$validUrl && !$validEmail) {
            continue;
        }
        $item['applicationUrl'] = $validUrl ? $url : '';
        $item['applicationEmail'] = $validEmail ? $email : '';
        $publicListings[] = array_intersect_key($item, $allowedFields);
    }
    return $publicListings;
}

function partnership_string(mixed $value, string $key, int $maxLength): string
{
    if (!is_string($value) || strlen($value) > $maxLength) {
        respond(['error' => 'Invalid value for partnership ' . $key . '.'], 400);
    }
    return $value;
}

function normalize_partnership_version(mixed $value): ?array
{
    if ($value === null) {
        return null;
    }
    if (!is_array($value)) {
        respond(['error' => 'Partnership content must be an object.'], 400);
    }

    $version = [];
    foreach ([
        'eyebrow' => 120,
        'title' => 240,
        'introHeading' => 240,
        'introSubheading' => 300,
        'introDescription' => 10000,
        'supportingText' => 10000,
    ] as $key => $limit) {
        $version[$key] = partnership_string($value[$key] ?? '', $key, $limit);
    }
    $textOrder = $value['textOrder'] ?? ['title', 'introHeading', 'introSubheading', 'introDescription', 'supportingText'];
    $allowedTextOrder = ['title', 'introHeading', 'introSubheading', 'introDescription', 'supportingText'];
    if (!is_array($textOrder) || count($textOrder) > count($allowedTextOrder)) {
        respond(['error' => 'Invalid partnership text order.'], 400);
    }
    $version['textOrder'] = [];
    foreach ($textOrder as $field) {
        if (!is_string($field) || !in_array($field, $allowedTextOrder, true) || in_array($field, $version['textOrder'], true)) {
            respond(['error' => 'Invalid partnership text order.'], 400);
        }
        $version['textOrder'][] = $field;
    }
    foreach ($allowedTextOrder as $field) {
        if (!in_array($field, $version['textOrder'], true)) {
            $version['textOrder'][] = $field;
        }
    }

    $categories = $value['categories'] ?? [];
    $images = $value['images'] ?? [];
    if (!is_array($categories) || count($categories) > 50 || !is_array($images) || count($images) > 50) {
        respond(['error' => 'Partnership content has too many categories or images.'], 400);
    }

    $version['categories'] = [];
    $categoryIds = [];
    $partnerIds = [];
    $partnerCount = 0;
    foreach ($categories as $index => $category) {
        if (!is_array($category)) {
            respond(['error' => 'Invalid partnership category.'], 400);
        }
        $id = partnership_string($category['id'] ?? '', 'category ID', 100);
        $name = partnership_string($category['name'] ?? '', 'category name', 240);
        $description = partnership_string($category['description'] ?? '', 'category description', 5000);
        if ($id === '' || in_array($id, $categoryIds, true)) {
            respond(['error' => 'Partnership category IDs must be unique and non-empty.'], 400);
        }
        $categoryIds[] = $id;
        $partners = $category['partners'] ?? [];
        if (!is_array($partners) || ($partnerCount += count($partners)) > 500) {
            respond(['error' => 'Partnership content has too many partner entries.'], 400);
        }
        $normalizedPartners = [];
        foreach ($partners as $partner) {
            if (!is_array($partner)) {
                respond(['error' => 'Invalid partnership entry.'], 400);
            }
            $partnerId = partnership_string($partner['id'] ?? '', 'partner ID', 100);
            $image = partnership_string($partner['image'] ?? '', 'image URL', 255);
            $websiteUrl = partnership_string($partner['websiteUrl'] ?? '', 'website URL', 2048);
            if ($partnerId === '' || in_array($partnerId, $partnerIds, true)) {
                respond(['error' => 'Partnership entry IDs must be unique and non-empty.'], 400);
            }
            if ($image !== '' && !valid_partnership_image($image)) {
                respond(['error' => 'Partnership images must use an approved uploaded image.'], 400);
            }
            if ($websiteUrl !== '' && !valid_website_url($websiteUrl)) {
                respond(['error' => 'Partner website links must be valid HTTP or HTTPS URLs.'], 400);
            }
            $partnerIds[] = $partnerId;
            $normalizedPartners[] = [
                'id' => $partnerId,
                'name' => partnership_string($partner['name'] ?? '', 'partner name', 240),
                'image' => $image,
                'description' => partnership_string($partner['description'] ?? '', 'partner description', 5000),
                'websiteUrl' => $websiteUrl,
                'displayOrder' => max(0, (int)($partner['displayOrder'] ?? 0)),
                'published' => ($partner['published'] ?? false) === true,
            ];
        }
        $version['categories'][] = [
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'displayOrder' => max(0, (int)($category['displayOrder'] ?? $index)),
            'published' => ($category['published'] ?? false) === true,
            'partners' => $normalizedPartners,
        ];
    }

    $version['images'] = [];
    foreach ($images as $image) {
        if (!is_array($image)) {
            respond(['error' => 'Invalid additional partnership image.'], 400);
        }
        $url = partnership_string($image['image'] ?? '', 'image URL', 255);
        if (!valid_partnership_image($url)) {
            respond(['error' => 'Partnership images must use an approved uploaded image.'], 400);
        }
        $version['images'][] = [
            'id' => partnership_string($image['id'] ?? '', 'image ID', 100),
            'image' => $url,
            'name' => partnership_string($image['name'] ?? '', 'image name', 240),
            'published' => ($image['published'] ?? false) === true,
            'displayOrder' => max(0, (int)($image['displayOrder'] ?? 0)),
        ];
    }
    return $version;
}

function normalize_partnership_section(mixed $value): ?array
{
    if ($value === null) {
        return null;
    }
    if (!is_array($value)) {
        respond(['error' => 'Partnership section must be an object.'], 400);
    }
    return [
        'draft' => normalize_partnership_version($value['draft'] ?? null),
        'published' => normalize_partnership_version($value['published'] ?? null),
    ];
}

function public_partnership_version(mixed $value): ?array
{
    if (!is_array($value)) {
        return null;
    }
    $version = $value;
    $categories = [];
    foreach (($version['categories'] ?? []) as $category) {
        if (!is_array($category) || ($category['published'] ?? false) !== true || trim((string)($category['name'] ?? '')) === '') {
            continue;
        }
        $partners = [];
        foreach (($category['partners'] ?? []) as $partner) {
            if (!is_array($partner) || ($partner['published'] ?? false) !== true) {
                continue;
            }
            $image = (string)($partner['image'] ?? '');
            if ($image !== '' && !valid_partnership_image($image)) {
                continue;
            }
            if ($image === '' && trim((string)($partner['name'] ?? '')) === '' && trim((string)($partner['description'] ?? '')) === '') {
                continue;
            }
            if (!valid_website_url((string)($partner['websiteUrl'] ?? ''))) {
                $partner['websiteUrl'] = '';
            }
            $partners[] = $partner;
        }
        if ($partners) {
            $category['partners'] = $partners;
            $categories[] = $category;
        }
    }
    $version['categories'] = $categories;
    $version['images'] = array_values(array_filter(
        $version['images'] ?? [],
        static fn($image): bool => is_array($image)
            && ($image['published'] ?? false) === true
            && valid_partnership_image((string)($image['image'] ?? ''))
    ));

    $hasText = false;
    foreach (['title', 'introHeading', 'introSubheading', 'introDescription', 'supportingText'] as $key) {
        if (trim((string)($version[$key] ?? '')) !== '') {
            $hasText = true;
            break;
        }
    }
    if (!$hasText && !$categories && !$version['images']) {
        return null;
    }
    $version['published'] = true;
    return $version;
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
            if ((string)$key === 'websiteUrl' && is_string($child) && $child !== '' && !valid_website_url($child)) {
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
