<script setup lang="ts">
import { media } from '~/data/media'
import { site } from '~/data/site'

const { url } = useCloudinary()
const route = useRoute()
const siteUrl = useSiteConfig().url // from `site.url` in nuxt.config.ts
const { googleSiteVerification } = useRuntimeConfig().public

// The one official address of the current page: path only, no ?query, on our real domain.
// Tells Google which URL to list when the same page is reachable at several addresses.
const canonical = computed(() => new URL(route.path, siteUrl).href)

useHead({
  // Pages set a short title ("Programs"); this appends the site name unless it's already there.
  titleTemplate: (title) => (!title ? site.name : title.includes('Mackenzie') ? title : `${title} · ${site.name}`),
  link: [
    { rel: 'icon', type: 'image/png', href: url(media.logo, { w: 64, h: 64, crop: 'fill', format: 'png' }) },
    { rel: 'canonical', href: canonical },
  ],
  // Proves to Google Search Console that we own the site (set the env var, redeploy, click Verify)
  meta: googleSiteVerification ? [{ name: 'google-site-verification', content: googleSiteVerification }] : [],
})

useSeoMeta({
  description: site.description,
  ogSiteName: site.name,
  ogType: 'website',
  ogUrl: canonical,
  ogImage: url(media.outreach, { w: 1200, h: 630, crop: 'fill' }),
  twitterCard: 'summary_large_image',
  themeColor: '#0c2250',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
