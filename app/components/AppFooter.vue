<script setup lang="ts">
import { media } from '~/data/media'
import { site } from '~/data/site'

const year = new Date().getFullYear()
const socials = site.social.filter((s) => s.url) // only show networks that have a real link

const explore = [
  { label: 'About us', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'News & Events', to: '/news' },
  { label: 'Get Involved', to: '/get-involved' },
]
const give = [
  { label: 'Donate now', to: '/donate/now' },
  { label: 'Ways to give', to: '/donate' },
  { label: 'Material donations', to: '/donate#material' },
  { label: 'Volunteer', to: '/get-involved#volunteer' },
]
</script>

<template>
  <footer class="border-t-4 border-gold-400 bg-navy-950 text-navy-100">
    <div class="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <NuxtLink to="/" class="flex items-center gap-3" aria-label="Mackenzie Foundation — home">
          <CloudImage :src="media.logo" alt="" ratio="1:1" :widths="[96, 192]" sizes="56px" class="size-14 rounded-full ring-2 ring-gold-400" />
          <span class="font-display text-xl font-semibold text-white">{{ site.name }}</span>
        </NuxtLink>
        <p class="mt-4 text-sm leading-relaxed">{{ site.description }}</p>
        <ul v-if="socials.length" class="mt-5 flex gap-3">
          <li v-for="s in socials" :key="s.label">
            <a
              :href="s.url"
              :aria-label="s.label"
              target="_blank"
              rel="noopener"
              class="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold-400 hover:text-navy-950"
            >
              <Icon :name="s.icon" size="20" />
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-sans text-sm font-semibold uppercase tracking-widest text-gold-300">Explore</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="l in explore" :key="l.to">
            <NuxtLink :to="l.to" class="transition hover:text-white hover:underline">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-sans text-sm font-semibold uppercase tracking-widest text-gold-300">Give</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="l in give" :key="l.to">
            <NuxtLink :to="l.to" class="transition hover:text-white hover:underline">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-sans text-sm font-semibold uppercase tracking-widest text-gold-300">Contact</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li class="flex gap-2.5"><Icon name="lucide:map-pin" size="18" class="mt-0.5 shrink-0 text-gold-300" />{{ site.contact.address }}</li>
          <li v-for="p in site.contact.phones" :key="p.tel" class="flex gap-2.5">
            <Icon name="lucide:phone" size="18" class="mt-0.5 shrink-0 text-gold-300" />
            <a :href="`tel:${p.tel}`" class="hover:text-white hover:underline">{{ p.display }}</a>
          </li>
          <li class="flex gap-2.5">
            <Icon name="lucide:mail" size="18" class="mt-0.5 shrink-0 text-gold-300" />
            <a :href="`mailto:${site.contact.email}`" class="break-all hover:text-white hover:underline">{{ site.contact.email }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10 py-5 text-center text-xs text-navy-300">
      © {{ year }} {{ site.name }}. All rights reserved.
    </div>
  </footer>
</template>
