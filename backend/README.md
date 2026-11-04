# PHP and MySQL setup

The website's PHP API is in `frontend/api/`; it runs on the same origin as the static pages. This directory contains the shared MySQL schema and command-line setup/migration scripts.

## Requirements

- PHP 8.2+
- PHP extensions: `pdo_mysql` and `dom`
- MySQL 5.7.8+ or MariaDB with JSON column support

## Database and local configuration

1. Create/select the MySQL database in Workbench or hPanel/phpMyAdmin, then run `backend/schema.sql`. It creates the content row, admin table, and enquiry table.
2. Copy `frontend/api/config.example.php` to `frontend/api/config.php`.
3. Set the database host, port, name, username, and password in `config.php`. Do not commit this file.
4. Run `php backend/seed.php` from a private terminal. Enter an admin username and a strong password when prompted. Running it for an existing username updates that account's password.
5. If the database contains content created by the old backend, run `php backend/migrate-gallery.php` once. It moves embedded base64 gallery images to `frontend/uploads/gallery/` and updates the content JSON. The script is safe to rerun.

Both CLI scripts use `frontend/api/config.php` by default. If the repository is deployed into `public_html/`, run them from that repository root. Otherwise, point the scripts at the deployed configuration and gallery directory:

```bash
NVS_CONFIG_FILE=/home/ACCOUNT/domains/DOMAIN/public_html/frontend/api/config.php \
NVS_UPLOAD_DIR=/home/ACCOUNT/domains/DOMAIN/public_html/frontend/uploads/gallery \
php backend/migrate-gallery.php
```

Use the same `NVS_CONFIG_FILE` setting with `php backend/seed.php`.

## API endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `api/session.php` | Public | Initialize session and return CSRF token/authentication state |
| POST | `api/login.php` | Public + CSRF | Verify admin credentials and start a PHP session |
| POST | `api/logout.php` | Admin + CSRF | End the PHP session |
| GET | `api/content.php` | Public | Load shared site content |
| PUT | `api/content.php` | Admin + CSRF | Save sanitized site content |
| POST | `api/inquiries.php` | Public + CSRF | Save a contact enquiry |
| GET | `api/inquiries.php` | Admin | List contact enquiries |
| DELETE | `api/inquiries.php?id=…` | Admin + CSRF | Delete an enquiry |
| POST | `api/upload.php` | Admin + CSRF | Validate and store a gallery/editor image |

The API is same-origin and uses PHP session cookies; no JWT, CORS configuration, or Node.js server is required.

## Local server

From the repository root, run `php -S 127.0.0.1:8002 -t frontend` and visit `http://127.0.0.1:8002/`. Do not use a static-only server for PHP endpoints.

## Hosting notes

- Deploy the repository root to `public_html/`; the root `.htaccess` routes public paths into `frontend/` and blocks direct access to private repository folders.
- Keep `frontend/api/config.php` private; the included `frontend/.htaccess` denies direct requests to it and shared API internals.
- Keep `frontend/uploads/.htaccess`; it prevents uploaded files from being executed as scripts.
- Ensure `frontend/uploads/gallery/` is writable by the PHP process.
- For Hostinger, select PHP 8.2+ in hPanel and confirm `pdo_mysql` and `dom` are enabled.
