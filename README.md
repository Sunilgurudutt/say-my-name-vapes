# Say My Name Vapes — Business Showcase Website

> A full-stack showcase website built for a real local vape shop. The store owner can manage products, offers, and store info through a custom admin dashboard — zero technical knowledge required.

**Live:** _coming soon_

---

## Overview

The client needed a professional web presence with the ability to keep their catalog up to date independently — no calling a developer every time a price changes. I built a complete solution: a polished storefront and a self-service admin panel, deployed and handed off with one password.

---

## Features

- **Storefront** — Hero section, featured products, active offers, store info, embedded Google Maps
- **Product catalog** — Category filtering, clean card grid, image support
- **Admin dashboard** — Full CRUD for products, offers, and store details behind a password
- **Image uploads** — Drag & drop or paste a URL directly in the admin panel
- **SEO ready** — Sitemap, robots.txt, Open Graph tags, GEO-optimized content for local search
- **Fully responsive** — Mobile, tablet, and desktop

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 15 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **Components** | shadcn/ui |
| **Database** | Upstash Redis |
| **Image Storage** | Vercel Blob |
| **Auth** | Custom bcrypt + httpOnly cookies |
| **Hosting** | Vercel |

No third-party auth libraries. Auth is a single Server Action — bcrypt hash comparison, httpOnly cookie, done.

---

## Architecture Highlights

**Dev/prod parity without complexity**
In development the app falls back to local JSON files and `/public/uploads` — no database setup needed to run locally. In production it switches to Upstash Redis and Vercel Blob automatically via environment variables.

**Self-contained auth**
No NextAuth, no Passport, no sessions table. A bcrypt hash in an env var, one server action, one httpOnly cookie. Simple, secure, zero dependencies.

**Owner-first admin UX**
The admin panel was designed for someone who has never used a CMS. Every action has one button. Image upload works by pasting a product photo URL or dragging a file in.

---

## Running Locally

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000` — no database setup needed.
Admin at `http://localhost:3000/admin` (dev password: `admin`)

---

## Deployment

Deployed on Vercel. Services connected:

- **Upstash Redis** — all dynamic data (products, offers, store info)
- **Vercel Blob** (Public) — product images

Environment variables required:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
BLOB_READ_WRITE_TOKEN=
ADMIN_PASSWORD_HASH=
```

---

## Design

Dark navy base (`#050a18`) with neon teal (`#2dd4bf`) and cyan (`#22d3ee`) accents. Clean, premium retail feel — built to look like money without spending any on a designer.

---

*Built by [Dheeraj](https://github.com/kdheerajsai401-prog)*
