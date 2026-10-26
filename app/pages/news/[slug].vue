<script setup lang="ts">
import { news } from '~/data/news'

// [slug].vue is a dynamic route: /news/medical-camp-for-children -> route.params.slug === 'medical-camp-for-children'
const route = useRoute()
const article = news.find((a) => a.slug === route.params.slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const { url } = useCloudinary()
useSeoMeta({
  title: article.title,
  description: article.excerpt,
  ogImage: url(article.image, { w: 1200, h: 630, crop: 'fill' }),
})

const more = news.filter((a) => a.slug !== article.slug).slice(0, 2)
</script>

<template>
  <article v-if="article">
    <header class="relative isolate overflow-hidden bg-navy-950 text-white">
      <div class="hero-glow absolute inset-0 -z-10" />
      <div class="container-page max-w-3xl py-14 sm:py-20">
        <NuxtLink to="/news" class="inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 hover:text-gold-200">
          <Icon name="lucide:arrow-left" size="16" /> All news
        </NuxtLink>
        <time :datetime="article.date" class="mt-6 block text-sm font-medium text-navy-200">{{ formatDate(article.date) }}</time>
        <h1 class="animate-fade-up mt-3 text-4xl font-semibold sm:text-5xl">{{ article.title }}</h1>
      </div>
    </header>

    <div class="container-page max-w-3xl py-14 text-lg leading-relaxed text-navy-800 sm:py-16">
      <CloudImage
        :src="article.image"
        :alt="article.imageAlt"
        ratio="16:9"
        sizes="(min-width: 768px) 768px, 100vw"
        class="mb-10 w-full rounded-3xl object-cover shadow-soft"
      />
      <p>{{ article.intro }}</p>
      <ul class="my-6 space-y-3">
        <li v-for="item in article.items" :key="item" class="flex items-start gap-3">
          <Icon name="lucide:circle-check" size="22" class="mt-0.5 shrink-0 text-gold-600" /> {{ item }}
        </li>
      </ul>
      <p>{{ article.outro }}</p>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gold-100 p-6">
        <p class="font-display text-xl font-semibold text-navy-900">Help us keep doing this work.</p>
        <BaseButton to="/donate/now">Donate now</BaseButton>
      </div>
    </div>

    <section class="container-page pb-4 sm:pb-8">
      <h2 class="text-2xl font-semibold text-navy-900">More news</h2>
      <div class="mt-6 grid gap-8 md:grid-cols-2"><NewsCard v-for="a in more" :key="a.slug" :article="a" /></div>
    </section>
  </article>
</template>
