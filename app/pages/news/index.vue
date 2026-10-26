<script setup lang="ts">
import { events } from '~/data/events'
import { news } from '~/data/news'

useSeoMeta({
  title: 'News & Events',
  description: 'The latest stories and upcoming events from Mackenzie Foundation.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="News & events"
      title="What’s happening at Mackenzie Foundation"
      subtitle="Stay updated with our latest activities and upcoming events."
    />

    <section id="news" class="container-page scroll-mt-28 py-16 sm:py-20">
      <SectionHeading align="left" eyebrow="Stories" title="Latest news" />
      <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NewsCard v-for="(a, i) in news" :key="a.slug" v-reveal="(i % 3) * 80" :article="a" />
      </div>
    </section>

    <section id="events" class="scroll-mt-28 bg-white py-16 sm:py-20">
      <div class="container-page">
        <SectionHeading align="left" eyebrow="Join us" title="Events" />
        <div class="mt-10 grid gap-5 lg:grid-cols-2">
          <EventCard v-for="(e, i) in events" :key="e.title" v-reveal="(i % 2) * 80" v-bind="e" />
        </div>
      </div>
    </section>

    <section class="container-page py-16 sm:py-20">
      <SectionHeading eyebrow="Our impact" title="The difference we make together" />
      <div class="mt-10"><StatsStrip /></div>
    </section>
  </div>
</template>
