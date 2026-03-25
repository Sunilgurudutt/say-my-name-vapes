# Say My Name Vapes

A modern, full-stack showcase website for a local Canadian vape shop. Built with Next.js 16 App Router — features a clean storefront for customers and a private admin dashboard for the owner to manage all content without touching code.

---

## Features

### Storefront
- Product catalogue with category filtering (Devices, E-Liquids, Components, Accessories)
- Active offers & promotions strip
- Customer reviews section
- Store info — address, hours, Google Maps embed
- Age gate on entry
- Fully responsive

### Admin Dashboard (`/admin`)
- Password-protected — owner login only
- Add, edit, delete products with image upload
- Manage offers with expiry dates and badges
- Manage customer reviews
- Update store info, hours, and social links

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + custom utilities |
| UI Components | Shadcn/ui |
| Animations | Framer Motion |
| Auth | Custom bcrypt + httpOnly cookies (Server Actions) |
| Database | Upstash Redis (falls back to local JSON in dev) |
| Image Storage | Vercel Blob (falls back to `/public/uploads` in dev) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)
Default dev password: `admin`

### Environment Variables

Create a `.env.local` file in the root:

```env
# Admin Auth
# Dev fallback — default password is "admin"
ADMIN_PASSWORD=admin

# Production — generate with:
# node -e "require('bcryptjs').hash('yourpassword',10).then(console.log)"
ADMIN_PASSWORD_HASH=

# Upstash Redis (optional — uses local JSON files if not set)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Vercel Blob (optional — saves to /public/uploads if not set)
BLOB_READ_WRITE_TOKEN=

# Next.js
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
```

---

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── gear/                 # Devices & hardware
│   ├── discover/             # E-liquids
│   ├── lab-series/           # Components
│   ├── about/                # About the store
│   ├── contact/              # Contact page
│   ├── admin/                # Owner dashboard (protected)
│   └── api/                  # REST API routes
├── components/
│   ├── home/                 # Homepage sections
│   ├── products/             # Product grid & filters
│   ├── admin/                # Admin forms & tables
│   ├── layout/               # Navbar, footer, sidebar
│   └── ui/                   # Shared UI components
├── lib/
│   ├── data.ts               # Data access layer (Redis / local JSON)
│   ├── auth.ts               # Session auth
│   └── seeds.ts              # Default placeholder content
└── types/
    └── index.ts              # TypeScript interfaces
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `ADMIN_PASSWORD_HASH` — bcrypt hash of owner's password
   - `NEXTAUTH_SECRET` — random 32-char string
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — from [upstash.com](https://upstash.com)
   - `BLOB_READ_WRITE_TOKEN` — from Vercel Blob storage
4. Deploy

---

## Owner Guide

| Task | Where |
|------|-------|
| Add / edit products | `/admin/products` |
| Add / edit offers | `/admin/offers` |
| Manage reviews | `/admin/reviews` |
| Update store info & hours | `/admin/store` |

To get your Google Maps embed URL: Google Maps → Share → **Embed a map** → copy only the `src="..."` value.

---

## License

Private — built for Say My Name Vapes. All rights reserved.
