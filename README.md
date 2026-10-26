# Mackenzie Foundation website

The website of the Mackenzie Foundation — shelter, education, healthcare and love for orphaned children in Uganda and Kenya.

**Stack:** [Nuxt 4](https://nuxt.com) (Vue 3, TypeScript) · [Tailwind CSS v4](https://tailwindcss.com) · [Cloudinary](https://cloudinary.com) for images · hosted on [Vercel](https://vercel.com).

> New to Vue/Nuxt? Read **[docs/LEARNING-GUIDE.md](docs/LEARNING-GUIDE.md)** — a beginner-friendly tour of this codebase written for React developers.

## Getting started

Requires Node.js **22.21+** (or 24 LTS). Check with `node -v`.

```bash
npm install
cp .env.example .env      # then fill in the values (see below)
npm run dev               # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build; pre-renders every page to static HTML into `.output/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check the whole project (TypeScript + `.vue` files) |
| `npm run upload:media -- <folder> [cloudinary-folder]` | Upload every image in a folder to Cloudinary |

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `.env` **and Vercel** | Public. Used to build image URLs. The build fails loudly if it's missing. |
| `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | `.env` **only** | Secret. Used only by `npm run upload:media` on your computer. **Do not add these to Vercel.** |

`.env` is git-ignored. `.env.example` is the template that *is* committed.

## Project layout

```
app/
  pages/          one file = one URL (index.vue → /, news/[slug].vue → /news/:slug)
  components/     reusable UI (AppHeader, BaseButton, CloudImage, NewsCard, …)
  layouts/        page shell: header + <slot/> + footer
  composables/    shared logic, e.g. useCloudinary() builds image URLs
  plugins/        app-wide setup, e.g. the v-reveal scroll animation
  utils/          small helpers (formatDate, formatMoney)
  data/           ★ the site's content: contact details, nav, news, events, programs, images
  assets/css/     main.css — Tailwind import + brand colours/fonts
scripts/          upload-media.mjs (Cloudinary uploader)
public/           files served as-is (robots.txt)
```

## Editing content (no framework knowledge needed)

Almost everything an editor changes lives in **`app/data/`**:

| To change… | Edit |
| --- | --- |
| Phone, email, address, social links, payment details | `site.ts` |
| Menu items | `navigation.ts` |
| News stories (a new object adds the list card **and** its `/news/<slug>` page) | `news.ts` |
| Events | `events.ts` |
| The four programs | `programs.ts` |
| Headline numbers (500+ children …) | `impact.ts` |
| Which Cloudinary image is used where | `media.ts` |

Adding a photo: `npm run upload:media -- ./my-photos mackenzie`, then add its ID (`mackenzie/<filename>`) to `media.ts`.
Upload originals at least **1600 px wide** — Cloudinary shrinks images on the fly but can't add detail that isn't there.

## Deploying to Vercel

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project →** import the repo. Vercel detects Nuxt automatically — keep the defaults.
3. Under **Environment Variables** add `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (all environments).
4. **Deploy.** Every push to `main` redeploys; pull requests get their own preview URL.

## Before going live — placeholders to fill in

- [ ] `site.ts` → `payments`: MTN / Airtel numbers and the bank account number are empty (the donate page says "contact us" until they're set).
- [ ] `site.ts` → `contact.email`: the old site used two different addresses (`info@mackenzie.org`, `info@mackenzieorphanage.org`); confirm which is real.
- [ ] `site.ts` → `social`: add real links; empty ones are hidden.
- [ ] `news.ts` / `events.ts`: carried over from the old site (news dated March 2024, events have no year). Replace with current items.
- [ ] Photos: replace the low-resolution placeholders with the foundation's own photographs, and confirm you hold the rights to every image used.
- [ ] Payments: the donate form currently shows payment instructions plus a pre-filled email. Online payment (cards / mobile-money checkout) needs a gateway such as Flutterwave, Pesapal or DPO.
- [ ] "Our Team" page: the old footer linked to one, but there was no content.
