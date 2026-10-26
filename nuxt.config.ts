import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-26',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/icon'],

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
