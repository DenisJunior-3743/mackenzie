<script setup lang="ts">
import { programs } from '~/data/programs'

useSeoMeta({
  title: 'Programs & Services',
  description:
    'Education support, healthcare, shelter and skills training — how Mackenzie Foundation cares for orphaned children.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Programs & services"
      title="Everything a child needs to thrive"
      subtitle="From the classroom to the clinic, our programs cover the whole child."
    />

    <!-- Quick jump links (sticks under the header while scrolling) -->
    <nav class="sticky top-16 z-30 border-b border-navy-100 bg-white/90 backdrop-blur lg:top-20" aria-label="Programs">
      <ul class="container-page flex gap-2 overflow-x-auto py-3">
        <li v-for="p in programs" :key="p.slug" class="shrink-0">
          <NuxtLink
            :to="`#${p.slug}`"
            class="inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-800 transition hover:bg-gold-100"
          >
            <Icon :name="p.icon" size="16" /> {{ p.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <section
      v-for="(p, i) in programs"
      :id="p.slug"
      :key="p.slug"
      class="scroll-mt-40 py-16 sm:py-20"
      :class="i % 2 ? 'bg-white' : ''"
    >
      <div class="container-page grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div v-reveal :class="i % 2 ? 'md:order-2' : ''">
          <CloudImage
            :src="p.image"
            :alt="p.imageAlt"
            ratio="4:3"
            sizes="(min-width: 768px) 50vw, 100vw"
            class="w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
        <div v-reveal="120" :class="i % 2 ? 'md:order-1' : ''">
          <span class="grid size-14 place-items-center rounded-2xl bg-navy-900 text-gold-300">
            <Icon :name="p.icon" size="28" />
          </span>
          <h2 class="mt-5 text-3xl font-semibold text-navy-900 sm:text-4xl">{{ p.title }}</h2>
          <p class="mt-4 text-lg leading-relaxed text-navy-700">{{ p.summary }}</p>
          <ul class="mt-6 space-y-2.5">
            <li v-for="point in p.points" :key="point" class="flex items-center gap-3 text-navy-900">
              <Icon name="lucide:circle-check" size="22" class="shrink-0 text-gold-600" /> {{ point }}
            </li>
          </ul>
          <BaseButton to="/donate" variant="outline" class="mt-8">Support this program</BaseButton>
        </div>
      </div>
    </section>

    <section class="container-page py-16 sm:py-20">
      <div class="rounded-3xl bg-gold-400 px-6 py-12 text-center sm:px-12">
        <h2 class="text-3xl font-semibold text-navy-950">Help us reach more children</h2>
        <BaseButton to="/donate/now" variant="navy" size="lg" class="mt-6">Donate now</BaseButton>
      </div>
    </section>
  </div>
</template>
