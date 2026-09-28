# NVS International Services — Backend API

Express + MySQL backend for the website. It stores the editable site
content, admin accounts, and visitor enquiries in **your MySQL database**
(the one you already open in MySQL Workbench) instead of the browser's
localStorage — so admin edits show up for **every** visitor on every device.

## What it provides

| Method | Endpoint              | Access  | Purpose                              |
|--------|-----------------------|---------|--------------------------------------|
| GET    | `/api/health`         | public  | Quick "is it running?" check         |
| POST   | `/api/login`          | public  | Admin login → returns a JWT token    |
| GET    | `/api/content`        | public  | The site content JSON (for the site) |
| PUT    | `/api/content`        | admin   | Save site content (admin panel)      |
| POST   | `/api/inquiries`      | public  | Save a contact-form enquiry          |
| GET    | `/api/inquiries`      | admin   | List all enquiries                   |
| DELETE | `/api/inquiries/:id`  | admin   | Delete one enquiry                   |

Admin routes require the `Authorization: Bearer <token>` header from `/api/login`.

## Prerequisites

- **Node.js 18+** — check with `node -v`
- **MySQL** running locally (you already have it via MySQL Workbench)

## Setup (one time)

### 1. Create the database and tables (in MySQL Workbench)
Open `backend/schema.sql` in Workbench
(**File ▸ Open SQL Script**), then click the ⚡ (Execute) button.
This creates the `nvs_international` database and its tables.

### 2. Configure the backend
```bash
cd backend
copy .env.example .env      # Windows (PowerShell/CMD).  macOS/Linux: cp .env.example .env
```
Open `.env` and set:
- `DB_USER` / `DB_PASSWORD` — the same MySQL login you use in Workbench
- `JWT_SECRET` — a long random string
  (generate one: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — the admin login you want

### 3. Install and seed
```bash
npm install
npm run seed        # creates your admin user + the content row
```

### 4. Run
```bash
npm start           # or: npm run dev  (auto-restarts on changes)
```
You should see: `NVS API running on http://127.0.0.1:4000`
Test it: open http://127.0.0.1:4000/api/health → `{"ok":true}`

## Connecting the website to this API

The front-end client is already written: **`frontend/api.js`**.
To switch the site from localStorage to the server, on each page load
`api.js` before `site.js`/`admin.js`, e.g. add to the HTML `<head>` or before
the existing script tags:

```html
<script src="api.js?v=1"></script>
```

`api.js` exposes `window.NVS_API` with:
- `bootstrap()` — pulls `/api/content` into localStorage before the page renders
  (falls back silently to defaults if the API is offline)
- `login(username, password)` — stores a JWT for admin saves
- `saveContent(data)` — admin panel → `PUT /api/content`
- `postInquiry(inquiry)` — contact form → `POST /api/inquiries`
- `listInquiries()` / `deleteInquiry(id)` — admin enquiries view

The wiring of these calls into `site.js`, `admin.js`, and `auth.js` is a
separate, reviewable step (it changes the admin login to use the server
instead of the hard-coded credentials). Ask and it will be done.

## Notes

- **Gallery images** are stored (base64) inside the content JSON, same as before.
  If large images fail to save, raise MySQL's `max_allowed_packet`
  (e.g. `SET GLOBAL max_allowed_packet = 64*1024*1024;`) or store fewer/smaller images.
- **Passwords** are never stored in plain text — only bcrypt hashes.
- **Production**: host MySQL somewhere reachable (e.g. Railway/PlanetScale/RDS),
  deploy this API (Render/Railway/a VM), set `CORS_ORIGIN` to your live site URL,
  and set `window.NVS_API_BASE` on the site to the deployed API URL.
- Never commit `.env` (already in `.gitignore`).
