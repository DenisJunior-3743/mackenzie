<script setup lang="ts">
import { site } from '~/data/site'

const props = defineProps<{ title: string; day: string; month: string; time: string; description: string }>()

// No backend needed: "Register" opens an email to the foundation, pre-filled.
const registerHref = computed(
  () =>
    `mailto:${site.contact.email}?subject=${encodeURIComponent(`Registration: ${props.title}`)}` +
    `&body=${encodeURIComponent(`Hello, I would like to register for "${props.title}" (${props.day} ${props.month}).`)}`,
)
</script>

<template>
  <article
    class="flex flex-wrap items-center gap-x-5 gap-y-4 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-100 sm:gap-x-6 sm:p-6"
  >
    <div class="grid w-20 shrink-0 place-items-center rounded-2xl bg-navy-900 py-3 text-center text-white">
      <span class="font-display text-3xl font-semibold leading-none">{{ day }}</span>
      <span class="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-300">{{ month }}</span>
    </div>
    <div class="min-w-0 flex-1 basis-40">
      <h3 class="text-lg font-semibold text-navy-900">{{ title }}</h3>
      <p class="mt-1 flex items-center gap-1.5 text-sm font-medium text-gold-800">
        <Icon name="lucide:clock" size="16" /> {{ time }}
      </p>
      <p class="mt-2 text-navy-700">{{ description }}</p>
    </div>
    <BaseButton :href="registerHref" variant="outline" class="w-full sm:w-auto">Register</BaseButton>
  </article>
</template>
