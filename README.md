# NVS International Services — Website

Marketing and information website for **NVS International Services**, an
organization that runs international scientific and academic conferences.
It is a fast, multi-page static site with an optional **Node.js + MySQL**
backend for shared, editable content.

## Features

- Multi-page site: Home, About, Conferences, Sponsors/Exhibitors, Gallery,
  General Information, Contact
- Built-in **admin panel** (`admin.html`) to edit page text, conferences,
  sponsorship packages, gallery images, and view contact enquiries
- SEO-ready: per-page meta tags, Open Graph/Twitter cards, JSON-LD,
  `sitemap.xml`, `robots.txt`
- Responsive design with a modern styling layer
- Optional backend so admin edits are shared across all visitors and devices
  (without it, the site still runs fully on built-in defaults)

## Tech stack

- **Frontend:** plain HTML, CSS, and vanilla JavaScript (no build step)
- **Backend (optional):** Node.js, Express, MySQL — see [`backend/`](backend/)
- **Fonts:** Manrope + DM Mono (Google Fonts)

## Project structure

```
.
├── frontend/               The website (static files — deploy this folder)
│   ├── index.html          Home (static)
│   ├── about.html          \
│   ├── conferences.html     |
│   ├── sponsors.html        |  Inner pages — rendered by site.js
│   ├── exhibitors.html      |  from the shared content model
│   ├── gallery.html         |
│   ├── general-information.html |
│   ├── contact.html        /
│   ├── admin.html          Admin panel
│   ├── 404.html            Not-found page
│   ├── site.js             Content model + page rendering
│   ├── admin.js            Admin panel logic
│   ├── auth.js             Admin login (server-backed, local fallback)
│   ├── api.js              Frontend client for the backend API
│   ├── styles.css          Base theme
│   ├── pages.css           Modern styling layer (loaded last)
│   └── logo.svg, robots.txt, sitemap.xml
├── backend/                Express + MySQL API (see backend/README.md)
└── docs/                   Source documents (not deployed)
```

## Getting started (frontend)

No build step is required. Serve the folder with any static server:

```bash
# Python (already used in this project)
python -m http.server 8000 --bind 127.0.0.1 --directory frontend
```

Then open http://127.0.0.1:8000/. Opening the HTML files directly with
`file://` also works, but a local server is recommended.

> **Cache-busting:** CSS/JS are linked with a `?v=` version string
> (e.g. `site.js?v=20260928-api`). After editing a `.css`/`.js` file,
> bump its `?v=` value in the HTML so browsers fetch the new version.

## Admin panel

Open `admin.html` and sign in. From there you can edit page content,
manage conferences and sponsorship packages, upload gallery images, and
review contact enquiries.

- **With the backend running:** login is verified by the server and every
  change is saved to MySQL, so all visitors see it.
- **Without the backend:** the panel falls back to this browser's
  `localStorage` — changes are visible only in that browser.

## Content model

The full editable content lives as one JSON object:

- `defaultSiteData` in `site.js` is the built-in baseline (always present).
- Admin edits are stored as overrides — in the backend database when it is
  running, otherwise in `localStorage` under the key `nvs-site-data`.
- On load, saved overrides are merged over the defaults, so the site always
  renders something sensible even with no backend and no saved data.

## Backend

The API stores content, admin accounts, and enquiries in MySQL. See
[`backend/README.md`](backend/README.md) for full setup (schema, `.env`,
seeding, running). In short:

```bash
cd backend
cp .env.example .env      # Windows: copy .env.example .env  — then edit it
npm install
npm run seed              # creates the admin user + content row
npm start                 # http://127.0.0.1:4000
```

Point the frontend at a non-default API URL by setting `window.NVS_API_BASE`
before `api.js` loads (defaults to `http://127.0.0.1:4000`).

## Deployment

- **Frontend:** deploy the `frontend/` folder to any static host (e.g. Vercel).
  On Vercel, set the project's **Root Directory** to `frontend` so the files
  are served at the domain root (so `/`, `/robots.txt`, `/sitemap.xml` resolve).
- **Backend:** host MySQL somewhere reachable (Railway/PlanetScale/RDS),
  deploy the API (Render/Railway/a VM), set `CORS_ORIGIN` to the live site
  URL, and set `window.NVS_API_BASE` on the site to the deployed API URL.

## License

© 2026 NVS International Services. All rights reserved.
