# Shlok Path Labs & Digital X-Ray — Website

Full-stack website for a pathology lab & digital X-ray centre in Banthara, Lucknow.

**Features:** bilingual (English / हिंदी), online test booking, home sample collection request, patient report download (by mobile + code), 278-test rate list with search, WhatsApp integration, and a full admin panel (bookings, reports upload, tests/rates editing, photo upload, settings).

## Tech
- Node.js + Express
- SQLite (better-sqlite3)
- Static HTML / CSS / JS frontend

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000 — admin panel at http://localhost:3000/admin

**Default admin login:** username `admin`, password `shlok@123` — change it from the admin panel (Settings → Change Password) after first login.

---

## Deploy live on Render (free)

### 1. Put the code on GitHub
1. Create a new **empty** repository at https://github.com/new (e.g. `shlok-path-labs`). Do NOT add a README/gitignore there — this project already has them.
2. In this project folder run:
   ```bash
   git remote add origin https://github.com/<your-username>/shlok-path-labs.git
   git branch -M main
   git push -u origin main
   ```
   The first push opens a GitHub sign-in in your browser — approve it.

### 2. Deploy on Render
1. Sign up / log in at https://render.com (you can sign in with GitHub).
2. Click **New +  →  Blueprint**, then select this repository.
3. Render reads `render.yaml` and sets everything up. Click **Apply / Deploy**.
4. After a few minutes you get a live URL like `https://shlok-path-labs.onrender.com`.

That's it — the site is live with all 278 tests, the logo and all images.

### Important: data on the free plan
Render's **free plan has temporary storage** — any new bookings, uploaded reports, or admin-uploaded photos are **erased on every redeploy / restart**. The tests, logo and built-in images always stay (they ship with the code).

**For real day-to-day use** (so bookings & reports are never lost), upgrade the Render service to a paid plan and, in `render.yaml`, uncomment the `DATA_DIR` env var and the `disk:` block, then redeploy. The database and uploads then live on a permanent disk.

### Custom domain (optional)
In Render → your service → **Settings → Custom Domains**, add e.g. `shlokpathlabs.in` and point your domain's DNS as Render instructs.
