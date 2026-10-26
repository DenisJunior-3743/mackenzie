<script setup lang="ts">
import { media } from '~/data/media'
import { programs } from '~/data/programs'
import { site } from '~/data/site'

useSeoMeta({
  title: 'About us',
  description:
    'Mackenzie Foundation provides shelter, education, healthcare and love to orphaned children in Uganda.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="About us"
      title="Giving every child a safe home and a hopeful future"
      subtitle="Mackenzie Foundation cares for orphaned children in Uganda."
    />

    <!-- MISSION -->
    <section id="mission" class="container-page grid scroll-mt-28 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 sm:py-24">
      <div v-reveal>
        <SectionHeading
          align="left"
          eyebrow="Our mission"
          title="Shelter, education, healthcare and love"
          subtitle="Every day, hundreds of children in Uganda are orphaned due to disease, conflict, and poverty. Our goal is to provide shelter, education, healthcare, and love to these children."
        />
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-navy-700">
          We ensure every child under our care is nurtured, protected, and empowered to grow with dignity and hope.
        </p>
      </div>
      <div v-reveal="120" class="relative">
        <div class="absolute -bottom-4 -right-4 size-full rounded-3xl bg-gold-300" aria-hidden="true" />
        <CloudImage
          :src="media.siblings"
          alt="Two children smiling together"
          ratio="16:10"
          sizes="(min-width: 768px) 50vw, 100vw"
          class="relative w-full rounded-3xl object-cover shadow-soft"
        />
      </div>
    </section>

    <!-- WHAT WE DO -->
    <section class="bg-white py-20 sm:py-24">
      <div class="container-page">
        <SectionHeading eyebrow="What we do" title="Four ways we care for every child" />
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(p, i) in programs"
            :key="p.slug"
            v-reveal="i * 80"
            :to="`/programs#${p.slug}`"
            class="group rounded-3xl bg-cream p-7 ring-1 ring-navy-100 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
          >
            <span class="grid size-12 place-items-center rounded-2xl bg-navy-900 text-gold-300">
              <Icon :name="p.icon" size="24" />
            </span>
            <h3 class="mt-5 text-lg font-semibold text-navy-900">{{ p.title }}</h3>
            <p class="mt-2 text-sm text-navy-700">{{ p.points.join(' · ') }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- WHERE WE SERVE -->
    <section id="where" class="container-page grid scroll-mt-28 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 sm:py-24">
      <div v-reveal class="md:order-2">
        <SectionHeading
          align="left"
          eyebrow="Where we serve"
          title="Rooted in Kampala, caring for Uganda’s children"
          subtitle="Our home is in Kampala, and we serve the children of Uganda."
        />
        <ul class="mt-6 space-y-3 text-navy-800">
          <li class="flex items-center gap-3">
            <Icon name="lucide:map-pin" size="20" class="text-gold-700" /> {{ site.contact.address }}
          </li>
          <li v-for="p in site.contact.phones" :key="p.tel" class="flex items-center gap-3">
            <Icon name="lucide:phone" size="20" class="text-gold-700" />
            <a :href="`tel:${p.tel}`" class="hover:underline">{{ p.display }}</a>
          </li>
        </ul>
      </div>
      <div v-reveal="120" class="md:order-1">
        <CloudImage
          :src="media.school"
          alt="Children walking to school"
          ratio="16:10"
          sizes="(min-width: 768px) 50vw, 100vw"
          class="w-full rounded-3xl object-cover shadow-soft"
        />
      </div>
    </section>

    <!-- NUMBERS -->
    <section class="container-page pb-4">
      <SectionHeading eyebrow="Our impact" title="Together, we’ve made a difference" />
      <div class="mt-10"><StatsStrip /></div>
    </section>

    <section class="container-page py-20 sm:py-24">
      <div class="rounded-3xl bg-navy-900 px-6 py-14 text-center text-white sm:px-12">
        <h2 class="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl">Be part of their story</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-navy-100">Give, volunteer or partner with us — every bit helps.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <BaseButton to="/donate/now" size="lg">Donate now</BaseButton>
          <BaseButton to="/get-involved" variant="outline-light" size="lg">Get involved</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>
