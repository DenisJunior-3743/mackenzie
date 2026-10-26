import tailwindcss from '@tailwindcss/vite'

// The public address of the site, needed for the sitemap, robots.txt and canonical links.
// Set NUXT_PUBLIC_SITE_URL (e.g. https://www.yourdomain.org) once you have a custom domain.
// Until then Vercel supplies the production *.vercel.app host automatically at build time.
const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

export default defineNuxtConfig({
  compatibilityDate: '2026-10-26',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Read by @nuxtjs/sitemap and @nuxtjs/robots (and available in code via useSiteConfig())
  site: {
    url: siteUrl,
    name: 'Mackenzie Foundation',
    description: 'Mackenzie Foundation provides shelter, education, healthcare and love to orphaned children in Uganda and Kenya.',
    defaultLocale: 'en',
    // Only the real production site should appear in Google. On Vercel, preview deployments
    // (one per pull request / branch) get env "preview", which makes robots.txt say "Disallow: /"
    // and adds <meta name="robots" content="noindex">. Production and local builds are unaffected.
    ...(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' ? { env: process.env.VERCEL_ENV } : {}),
  },

  // Tailwind v4 is a Vite plugin; the theme lives in app/assets/css/main.css
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  // Self-hosted Google fonts (downloaded at build time, served from our own domain)
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Fraunces', provider: 'google', weights: [500, 600, 700] },
    ],
  },

  // Bundle every icon we reference (e.g. 'lucide:heart') so pages never fetch icons at runtime
  icon: { clientBundle: { scan: true } },

  // Values readable in components via useRuntimeConfig().
  // `public.*` is exposed to the browser and is overridden by NUXT_PUBLIC_* env vars.
  runtimeConfig: {
    public: {
      cloudinaryCloudName: '', // <- NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      // Google Search Console ownership token (the "HTML tag" method). It's public by design — it appears in the
      // page source — so it lives here. Keep it: removing it un-verifies the site.
      // The public/googleb226746eb28511d3.html file is a second, independent proof; either one is enough.
      // Override with NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION if the token ever changes.
      googleSiteVerification: 'ucqB4q2MODHoFNf4rCf1Y1CkkjP7e_GdV4PQUOsqNC4',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },

  // Pre-render every page to static HTML at build time (fast, great for SEO).
  // crawlLinks follows <a href> links, so /news/<slug> pages are discovered automatically.
  nitro: { prerender: { crawlLinks: true, routes: ['/'] } },
})
