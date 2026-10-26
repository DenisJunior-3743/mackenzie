<script setup lang="ts">
import { projects } from '~/data/impact'
import { media } from '~/data/media'
import { news } from '~/data/news'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Mackenzie Foundation — Empowering Orphans, Transforming Lives',
  description:
    'Join Mackenzie Foundation in providing shelter, education, healthcare and love to orphaned children in Uganda and Kenya.',
})

// Structured data (schema.org JSON-LD): tells Google this is a non-profit, so search results can
// show the right name, logo and contact details. Everything comes from data/site.ts.
const { url } = useCloudinary()
const siteUrl = useSiteConfig().url
const socialLinks = site.social.filter((s) => s.url).map((s) => s.url)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: site.name,
        url: siteUrl,
        logo: url(media.logo, { w: 512, h: 512, crop: 'fill', format: 'png' }),
        description: site.description,
        email: site.contact.email,
        telephone: site.contact.phones[0].tel,
        address: {
          '@type': 'PostalAddress',
          postOfficeBoxNumber: '4277',
          postalCode: '30200',
          addressLocality: 'Bidii',
          addressRegion: 'Trans Nzoia County',
          addressCountry: 'KE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: site.location.lat, longitude: site.location.lng },
        hasMap: site.location.googleMapsUrl,
        areaServed: ['Uganda', 'Kenya'],
        ...(socialLinks.length ? { sameAs: socialLinks } : {}),
      }),
    },
  ],
})

const pillars = [
  {
    title: 'Our Mission',
    text: 'To provide shelter, education, healthcare and love to orphaned children in Uganda and Kenya.',
    image: media.siblings,
    alt: 'Two children smiling together',
    to: '/about#mission',
  },
  {
    title: 'What We Do',
    text: 'Education, healthcare, shelter and skills training — everything a child needs to thrive.',
    image: media.supplies,
    alt: 'Volunteers distributing supplies to children',
    to: '/programs',
  },
  {
    title: 'Where We Serve',
    text: 'Children across Uganda and Kenya, with our home in Bidii, Trans Nzoia County.',
    image: media.school,
    alt: 'Children walking to school together',
    to: '/about#where',
  },
]

const ways = [
  {
    icon: 'lucide:gift',
    title: 'Give',
    text: 'Give once or every month to support a child’s education, health and shelter.',
    cta: 'See ways to give',
    to: '/donate',
  },
  {
    icon: 'lucide:users',
    title: 'Volunteer',
    text: 'Share your time and skills — mentoring, tutoring, workshops and community outreach.',
    cta: 'Start volunteering',
    to: '/get-involved#volunteer',
  },
  {
    icon: 'lucide:megaphone',
    title: 'Fundraise',
    text: 'Rally friends, family or your workplace behind a child’s future.',
    cta: 'Fundraise with us',
    to: '/get-involved#fundraise',
  },
]

const latest = news.slice(0, 3)
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative isolate overflow-hidden bg-navy-950 text-white">
      <CloudImage
        :src="media.outreach"
        alt="Smiling children holding hygiene supplies"
        eager
        class="absolute inset-0 -z-20 size-full object-cover object-top"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/25" />
      <div class="container-page pb-32 pt-24 sm:pb-40 sm:pt-32 lg:pt-40">
        <p
          class="animate-fade-up inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-200 ring-1 ring-gold-300/40"
        >
          <Icon name="lucide:sparkles" size="16" /> Mackenzie Foundation · Uganda and Kenya
        </p>
        <h1 class="animate-fade-up mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl [animation-delay:100ms]">
          Empowering orphans, <span class="text-gold-300">transforming lives</span>
        </h1>
        <p class="animate-fade-up mt-6 max-w-xl text-lg text-navy-100 sm:text-xl [animation-delay:200ms]">
          Join us in making a difference for the children of Uganda and Kenya.
        </p>
        <div class="animate-fade-up mt-10 flex flex-wrap gap-4 [animation-delay:300ms]">
          <BaseButton to="/donate/now" size="lg"><Icon name="lucide:heart" size="20" /> Donate now</BaseButton>
          <BaseButton to="/programs" variant="outline-light" size="lg">See our programs</BaseButton>
        </div>
      </div>
    </section>

    <!-- IMPACT NUMBERS (overlaps the hero) -->
    <div class="container-page relative z-10 -mt-14 sm:-mt-16">
      <StatsStrip />
    </div>

    <!-- WHY WE EXIST -->
    <section class="container-page py-20 text-center sm:py-24">
      <div v-reveal class="mx-auto max-w-3xl">
        <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-800">Why we exist</p>
        <p class="font-display text-2xl font-medium leading-snug text-navy-900 sm:text-3xl">
          Every day, hundreds of children in Uganda and Kenya are orphaned due to disease, conflict, and poverty.
        </p>
        <p class="mt-6 text-lg text-navy-700">
          At <strong class="text-navy-900">Mackenzie Foundation</strong>, our goal is to provide shelter, education,
          healthcare, and love to these children.
        </p>
        <BaseButton to="/about" variant="outline" class="mt-8">Learn more about us</BaseButton>
      </div>
    </section>

    <!-- WELFARE -->
    <section class="bg-white py-20 sm:py-24">
      <div class="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div v-reveal class="relative">
          <div class="absolute -bottom-4 -left-4 size-full rounded-3xl bg-gold-300" aria-hidden="true" />
          <CloudImage
            :src="media.feeding"
            alt="Children sharing a meal"
            ratio="4:3"
            sizes="(min-width: 768px) 50vw, 100vw"
            class="relative w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
        <div v-reveal="120">
          <SectionHeading
            align="left"
            eyebrow="Care that lasts"
            title="Dedicated to the welfare of young children"
            subtitle="We ensure every child under our care is nurtured, protected, and empowered to grow with dignity and hope."
          />
          <NuxtLink
            to="/programs"
            class="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy-900 hover:text-navy-600"
          >
            Explore our programs <Icon name="lucide:arrow-right" size="18" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- THREE PILLARS -->
    <section class="container-page py-20 sm:py-24">
      <SectionHeading
        title="By supporting an orphan, you are supporting the future generation"
        eyebrow="Our promise"
      />
      <div class="mt-14 grid gap-8 md:grid-cols-3">
        <NuxtLink
          v-for="(p, i) in pillars"
          :key="p.title"
          v-reveal="i * 100"
          :to="p.to"
          class="group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-navy-100 transition duration-300 hover:-translate-y-1"
        >
          <CloudImage
            :src="p.image"
            :alt="p.alt"
            ratio="4:3"
            sizes="(min-width: 768px) 33vw, 100vw"
            class="w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-navy-900">{{ p.title }}</h3>
            <p class="mt-2 text-navy-700">{{ p.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- PROJECTS & IMPACT -->
    <section class="bg-navy-900 py-20 text-white sm:py-24">
      <div class="container-page">
        <SectionHeading
          light
          eyebrow="Where your support goes"
          title="What your gift provides"
          subtitle="Every gift helps provide a safe bed, a meal, schooling and a check-up."
        />
        <ul class="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <li
            v-for="(p, i) in projects"
            :key="p.label"
            v-reveal="i * 60"
            class="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 transition hover:bg-white/10"
          >
            <span class="mx-auto grid size-14 place-items-center rounded-full bg-gold-400 text-navy-950">
              <Icon :name="p.icon" size="28" />
            </span>
            <p class="mt-4 font-medium">{{ p.label }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- AMINA'S STORY -->
    <section class="bg-blush py-20 sm:py-24">
      <div class="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div v-reveal class="md:order-2">
          <CloudImage
            :src="media.amina"
            alt="Amina, smiling"
            ratio="4:3"
            sizes="(min-width: 768px) 50vw, 100vw"
            class="w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
        <div v-reveal="120" class="md:order-1">
          <Icon name="lucide:quote" size="40" class="text-gold-500" />
          <h2 class="mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">Meet Amina</h2>
          <p class="mt-5 text-lg leading-relaxed text-navy-800">
            Amina lost her parents at a very young age. Through the support of Mackenzie Foundation, she now has access
            to quality education, proper healthcare, and a loving community that supports her dreams. She aspires to
            become a doctor and help other children in need.
          </p>
          <BaseButton to="/donate/now" class="mt-8">Help a child like Amina</BaseButton>
        </div>
      </div>
    </section>

    <!-- HOW TO TAKE PART -->
    <section class="container-page py-20 sm:py-24">
      <SectionHeading eyebrow="Get involved" title="How you can take part" />
      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <div
          v-for="(w, i) in ways"
          :key="w.title"
          v-reveal="i * 100"
          class="flex flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-navy-100"
        >
          <span class="grid size-14 place-items-center rounded-2xl bg-gold-100 text-gold-800">
            <Icon :name="w.icon" size="28" />
          </span>
          <h3 class="mt-5 text-2xl font-semibold text-navy-900">{{ w.title }}</h3>
          <p class="mt-2 flex-1 text-navy-700">{{ w.text }}</p>
          <NuxtLink :to="w.to" class="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy-900 hover:text-navy-600">
            {{ w.cta }} <Icon name="lucide:arrow-right" size="18" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- LATEST NEWS -->
    <section class="container-page pb-4">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading align="left" eyebrow="Stay in touch" title="Latest news" />
        <NuxtLink to="/news" class="inline-flex items-center gap-1.5 font-semibold text-navy-900 hover:text-navy-600">
          All news &amp; events <Icon name="lucide:arrow-right" size="18" />
        </NuxtLink>
      </div>
      <div class="mt-10 grid gap-8 md:grid-cols-3">
        <NewsCard v-for="(a, i) in latest" :key="a.slug" v-reveal="i * 100" :article="a" />
      </div>
    </section>

    <!-- FINAL CALL TO ACTION -->
    <section class="container-page py-20 sm:py-24">
      <div class="rounded-3xl bg-gold-400 px-6 py-14 text-center sm:px-12">
        <h2 class="mx-auto max-w-2xl text-3xl font-semibold text-navy-950 sm:text-4xl">Ready to change a child’s story?</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-navy-900">
          Your gift today helps provide shelter, education, healthcare and love.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <BaseButton to="/donate/now" variant="navy" size="lg">Donate now</BaseButton>
          <BaseButton to="/get-involved" variant="outline" size="lg">Volunteer instead</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>
