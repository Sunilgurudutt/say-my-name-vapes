# Say My Name Vapes — Project Guide

## Overview
Showcase website for a local vape shop. **No e-commerce** — display only.
Owner manages content (products, offers, store info) via the built-in admin dashboard.

## Dev Server
```bash
cd "say my name vapes/say-my-name-vapes"
npm run dev
# http://localhost:3000
# Admin: http://localhost:3000/admin  →  password: "admin" (dev only)
```

## Build
```bash
npm run build
```

## Design
- **Theme:** Breaking Bad / Heisenberg — dark navy (#050a18), neon teal (#2dd4bf), cyan (#22d3ee)
- **Font:** Geist Sans for body, Great Vibes for the "Vapes" script in the hero
- **Key classes:** `circuit-bg`, `tech-panel`, `holo-figure`, `neon-divider`, `glass-card`, `glow-teal`, `holographic-text`

## Architecture
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + custom utilities in `app/globals.css`
- **UI:** Shadcn/ui (admin forms, tables)
- **Animations:** Framer Motion

## Data
- **Dev:** JSON files auto-created in `/data/` folder (no setup needed)
- **Production:** Set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` for persistent Redis storage
- **Images:** Dev saves to `/public/uploads/`. Set `BLOB_READ_WRITE_TOKEN` for Vercel Blob in production.

## Auth
- Admin login at `/admin/login`
- **Dev password:** `admin` (set via `ADMIN_PASSWORD=admin` in `.env.local`)
- **Production:** Set `ADMIN_PASSWORD_HASH` (bcrypt hash):
  ```bash
  node -e "require('bcryptjs').hash('yourpassword',10).then(console.log)"
  ```

## Key Files
| File | Purpose |
|---|---|
| `app/globals.css` | All design tokens, keyframes, utility classes |
| `lib/data.ts` | Data access layer (Redis or local JSON) |
| `lib/seeds.ts` | Default placeholder content |
| `lib/auth.ts` | Session auth (bcrypt + httpOnly cookie) |
| `components/home/HeroSection.tsx` | Heisenberg holographic hero |
| `components/home/CategoryCards.tsx` | Tech-panel category cards |
| `components/admin/ProductForm.tsx` | Add/edit product form with image upload |
| `types/index.ts` | All TypeScript interfaces |

## Deployment (Vercel)
1. Push to GitHub → connect to Vercel
2. Storage → Add KV Store (Upstash Redis) → link to project
3. Storage → Add Blob Store → link to project
4. Environment Variables:
   - `ADMIN_PASSWORD_HASH` (generate with bcrypt)
   - `NEXTAUTH_SECRET` (any random 32-char string)
5. Deploy

## Owner Instructions
- Update store info: `/admin/store` (address, hours, Google Maps embed URL, social links)
- Add products: `/admin/products/new` (name, price, category, photo, in-stock toggle)
- Add offers: `/admin/offers/new` (title, description, badge, expiry date)
- To get Google Maps embed URL: Google Maps → share → "Embed a map" → copy the `src="..."` URL only

## Placeholder Images
Replace SVGs in `/public/images/` with real product photos via the admin dashboard.
