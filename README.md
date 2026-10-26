# Mackenzie Foundation website

The website of the Mackenzie Foundation — shelter, education, healthcare and love for orphaned children in Uganda and Kenya.

**Stack:** [Nuxt 4](https://nuxt.com) (Vue 3, TypeScript) · [Tailwind CSS v4](https://tailwindcss.com) · [Cloudinary](https://cloudinary.com) for images · hosted on [Vercel](https://vercel.com).

> New to Vue/Nuxt? Read **[docs/LEARNING-GUIDE.md](docs/LEARNING-GUIDE.md)** — a beginner-friendly tour of this codebase written for React developers.

## Getting started

Requires Node.js **22.22.3+** (or **24.15+**) — that's what Nuxt 4.6's own packages require. Check with `node -v`; install a newer one from <https://nodejs.org> if needed. (Older versions often still run, but print "unsupported" warnings.)

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
| `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Vercel (optional) | The token Google Search Console gives you to prove you own the site. See *Getting found on Google*. |
| `NUXT_PUBLIC_SITE_URL` | Vercel (optional) | The site's public address, e.g. `https://www.yourdomain.org`. Only needed once you have a custom domain; until then the `*.vercel.app` address is detected automatically. |

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
```

`public/` holds files served as-is at the site root — currently Google's Search Console verification file. `robots.txt` and `sitemap.xml` are generated automatically by the `@nuxtjs/robots` and `@nuxtjs/sitemap` modules — there's no file to maintain.

## Editing content (no framework knowledge needed)

Almost everything an editor changes lives in **`app/data/`**:

| To change… | Edit |
| --- | --- |
| Phone, email, address, social links, payment details | `site.ts` |
| Menu items | `navigation.ts` |
| News stories (a new object adds the list card **and** its `/news/<slug>` page) | `news.ts` |
| Events | `events.ts` |
| The four programs | `programs.ts` |
| Headline numbers (children supported, volunteers …) | `impact.ts` |
| Which Cloudinary image is used where | `media.ts` |

Adding a photo: `npm run upload:media -- ./my-photos mackenzie`, then add its ID (`mackenzie/<filename>`) to `media.ts`.
Upload originals at least **1600 px wide** — Cloudinary shrinks images on the fly but can't add detail that isn't there.

## Deploying to Vercel

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project →** import the repo. Vercel detects Nuxt automatically — keep the defaults.
3. Under **Environment Variables** add `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (all environments).
4. **Deploy.** Every push to `main` redeploys; pull requests get their own preview URL.

## Getting found on Google (Search Console)

**What the site already does for you:** a `sitemap.xml` listing every page (new news stories are added automatically), a `robots.txt` that points to it, a canonical URL on every page, page titles/descriptions, and schema.org "NGO" data on the home page. Vercel *preview* deployments are automatically hidden from Google so only the real site is listed.

**Ownership is already proven in the code, two independent ways** (Google needs only one — keep both and don't delete either, or the site becomes unverified):

- the file `public/googleb226746eb28511d3.html`, served at `/googleb226746eb28511d3.html`
- the `<meta name="google-site-verification">` tag, whose token is `googleSiteVerification` in `nuxt.config.ts`

**Setting it up in Search Console** (for the production address `https://mackenzie-seven.vercel.app`):

1. Go to <https://search.google.com/search-console> → **Add property** → choose **URL prefix** (the right-hand box) → enter `https://mackenzie-seven.vercel.app`.
   *Don't use "Domain"* and ignore the DNS TXT record option — it needs DNS access, which nobody has on a `vercel.app` address.
2. Once the site with these files is deployed, click **Verify** (HTML file or HTML tag — either works).
3. *Sitemaps* → enter `sitemap.xml` → **Submit**. It should report *Success* and about 11 discovered pages.
4. *URL Inspection* → paste your home page address → **Request indexing**. Repeat for a few key pages.

Then wait — Google usually takes a few days to a few weeks. Check progress with the *Pages* report, or search `site:mackenzie-seven.vercel.app`.

If the verification token ever changes (e.g. a new Search Console property), either replace it in `nuxt.config.ts` or set the Vercel environment variable `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, which takes priority.

**If Google can't reach the site:** open your address in a private/incognito window. If it asks you to log in to Vercel, *Deployment Protection* is on — in Vercel go to *Settings → Deployment Protection* and make sure Production is public.

**Be realistic about `*.vercel.app`:** it works, and it's fine for getting started, but a shared subdomain ranks poorly and shows an unfamiliar address in results. For people searching "Mackenzie Foundation" you'll want a custom domain (about $10–15/year; Vercel → *Domains*). When you add one: set `NUXT_PUBLIC_SITE_URL` to it, redeploy, and add it to Search Console as a new property.

## Before going live — placeholders to fill in

- [ ] `site.ts` → `payments`: MTN / Airtel numbers and the bank account number are empty (the donate page says "contact us" until they're set). The bank name and branch (Stanbic Bank Uganda, Kampala Main Branch) are also left over from the old site and need checking now that the contact address is in Kenya.
- [ ] `site.ts` → `social`: add real links; empty ones are hidden.
- [ ] `news.ts` / `events.ts`: carried over from the old site (news dated March 2024, events have no year). Replace with current items.
- [ ] Photos: replace the low-resolution placeholders with the foundation's own photographs, and confirm you hold the rights to every image used.
- [ ] Payments: the donate form currently shows payment instructions plus a pre-filled email. Online payment (cards / mobile-money checkout) needs a gateway such as Flutterwave, Pesapal or DPO.
- [ ] "Our Team" page: the old footer linked to one, but there was no content.
