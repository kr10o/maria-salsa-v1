---
trigger: always_on
---

# Workspace Rules: La Maria SPA Migration

## 1. Styling & UI
* **Tailwind CSS:** Maintain the existing Neumorphic design system. Ensure custom variables (`--bg-color`, `--shadow-light-color`) and utility classes (`.neo`, `.neo-btn`) are preserved in `src/global.css`.

## 2. Analytics Integration (UAParser + getanalytics.io)
* **Edge Tracking:** Analytics must not block the client UI. Track page views natively in Cloudflare Workers.
* **Implementation:** Inside `src/routes/layout.tsx`, use `UAParser.js` to parse `request.headers.get('user-agent')`. 
* **Standardization:** Pass the parsed browser/OS data alongside the `CF-IPCountry` header to a server-side instance of `getanalytics.io` to format the payload before inserting it into the `analytics` D1 table.

## 3. Database Schema (Drizzle ORM)
* **Tables:** Ensure `posts`, `translations`, and `analytics` tables are strictly typed in `src/database/schema.ts`.