<script setup lang="ts">
import type { Article } from '~/data/news'

defineProps<{ article: Article }>()
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-navy-100 transition duration-300 hover:-translate-y-1"
  >
    <NuxtLink :to="`/news/${article.slug}`" class="block overflow-hidden" tabindex="-1" aria-hidden="true">
      <CloudImage
        :src="article.image"
        :alt="article.imageAlt"
        ratio="16:10"
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        class="w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </NuxtLink>
    <div class="flex flex-1 flex-col p-6">
      <time :datetime="article.date" class="text-sm font-medium text-gold-800">{{ formatDate(article.date) }}</time>
      <h3 class="mt-2 text-xl font-semibold text-navy-900">
        <NuxtLink :to="`/news/${article.slug}`" class="hover:underline">{{ article.title }}</NuxtLink>
      </h3>
      <p class="mt-3 flex-1 text-navy-700">{{ article.excerpt }}</p>
      <NuxtLink
        :to="`/news/${article.slug}`"
        class="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-900 hover:text-navy-600"
      >
        Read more
        <Icon name="lucide:arrow-right" size="18" class="transition group-hover:translate-x-1" />
      </NuxtLink>
    </div>
  </article>
</template>
