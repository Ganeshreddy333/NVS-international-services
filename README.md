# NVS International Services

Responsive website and admin panel for NVS International Services, built for PHP/MySQL hosting.

## Stack

- **Frontend:** HTML5, CSS3, JavaScript, and Bootstrap 5
- **Backend:** PHP 8.2+
- **Database:** MySQL through PDO
- **Admin authentication:** PHP sessions with CSRF protection
- **Content editing:** standard HTML textareas
- **Gallery:** validated PHP image uploads
- **Hosting target:** Hostinger

The existing page content and custom styling are retained. The PHP application serves the website, JSON API, admin panel, and uploaded images from one origin.

## Run locally

Requirements: PHP 8.2+ with `pdo_mysql` and `dom`, plus a running MySQL server.

1. Create a database named `nvs_international`, select it in MySQL Workbench, then run [`backend/schema.sql`](backend/schema.sql).
2. Copy `frontend/api/config.example.php` to `frontend/api/config.php` and enter your MySQL connection details.
3. Create or update an admin login:

   ```bash
   php backend/seed.php
   ```

4. Convert existing database gallery images from the old base64 format into files:

   ```bash
   php backend/migrate-gallery.php
   ```

   Run this once after configuring the database. It is safe to rerun.

5. Start PHP's local web server from the repository root:

   ```bash
   php -S 127.0.0.1:8002 -t frontend
   ```

6. Visit <http://127.0.0.1:8002/>. The admin panel is at <http://127.0.0.1:8002/admin.html>.

Do not use Python's static HTTP server for this stack: it does not execute PHP.

## Hostinger deployment

The repository root is prepared for Hostinger's Apache web root. Deploy the repository to `public_html/`; the root `.htaccess` serves the site from `frontend/` and blocks direct web access to `backend/`, `docs/`, and repository metadata.

1. In hPanel, create a MySQL database and user; select that database in phpMyAdmin and run [`backend/schema.sql`](backend/schema.sql).
2. In hPanel, set the domain to PHP 8.2 or newer and confirm the `PDO MySQL` and `DOM` extensions are enabled.
3. In hPanel **Git**, connect this GitHub repository, select the `main` branch, and set its deployment directory to `public_html`. Alternatively, upload the repository contents there with File Manager or FTP. Keep the root `.htaccess`, `frontend/.htaccess`, `frontend/uploads/.htaccess`, and the `frontend/api/` directory.
4. On the server, copy `frontend/api/config.example.php` to `frontend/api/config.php` and enter the MySQL host, database name, username, and password from hPanel. This file is git-ignored and blocked from direct web access.
5. Ensure `frontend/uploads/gallery/` is writable by PHP. The image API creates the folder when first used if its parent is writable.
6. If SSH is available, create the admin account from the repository directory:

   ```bash
   php backend/seed.php
   ```

   If existing content is in the old MySQL database, first back up the database, then migrate its base64 gallery images to the deployed file directory:

   ```bash
   NVS_CONFIG_FILE="$PWD/frontend/api/config.php" \
   NVS_UPLOAD_DIR="$PWD/frontend/uploads/gallery" \
   php backend/migrate-gallery.php
   ```

   Run the migration before switching the domain to the new deployment. See [`backend/README.md`](backend/README.md) for SSH paths and migration details.
7. Open `https://your-domain.example/admin.html` and sign in with the account created by `seed.php`.

Uploaded gallery image files are limited to 5 MB after browser-side resizing; Hostinger's PHP upload limits must allow at least that size.

## Data and security

- Admin edits are stored in the MySQL `site_content` row and are shared with all visitors.
- Admin credentials are stored as PHP `password_hash()` hashes. Existing bcrypt hashes from the previous Node.js setup remain verifiable.
- State-changing API calls use same-origin PHP sessions and CSRF tokens. SQL uses PDO prepared statements, and saved HTML content is sanitized on save and load.
- Contact enquiries are stored in MySQL and visible in the admin panel.
- Gallery uploads are checked as JPEG, PNG, GIF, or WebP images and stored with random filenames outside executable paths.

See [`backend/README.md`](backend/README.md) for database, setup, and migration details.

© 2026 NVS International Services. All rights reserved.
