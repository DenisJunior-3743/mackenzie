<script setup lang="ts">
import { media } from '~/data/media'
import { site } from '~/data/site'

const { url } = useCloudinary()

useHead({
  // Pages set a short title ("Programs"); this appends the site name unless it's already there.
  titleTemplate: (title) => (!title ? site.name : title.includes('Mackenzie') ? title : `${title} · ${site.name}`),
  link: [{ rel: 'icon', type: 'image/png', href: url(media.logo, { w: 64, h: 64, crop: 'fill', format: 'png' }) }],
})

useSeoMeta({
  description: site.description,
  ogSiteName: site.name,
  ogType: 'website',
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
