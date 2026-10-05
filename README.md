# StatusKaro

WhatsApp Status maker for clothing sellers, with landing page, user login and admin panel.

## Run locally
```bash
npm install
npm run dev        # site on http://localhost:5173, API on :3001
```
On first start the server prints the **admin user ID and password** in the terminal (shown once).
Set your own with `ADMIN_USER` / `ADMIN_PASSWORD` environment variables.

## Production (one server, one process)
```bash
npm install
npm run build
NODE_ENV=production ADMIN_PASSWORD=your-strong-password npm start
```
The Node server serves the website and the API. Data lives in `data/statuskaro.db` (SQLite) — back this folder up.
Use a host with a persistent disk (VPS, Railway/Render with volume). Serve over HTTPS.

## Selling
- Edit `src/config.js`: your WhatsApp number, price, support email.
- Customer pays (JazzCash/Easypaisa/bank) → in **/admin** click **+30 days** (or Add user). Pro expires automatically.
- Free users get a watermark; Pro users don't.
