<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    subtitle?: string
    align?: 'center' | 'left'
    light?: boolean // for use on dark backgrounds
  }>(),
  { align: 'center' },
)
</script>

<template>
  <div class="max-w-2xl" :class="align === 'center' ? 'mx-auto text-center' : ''">
    <p
      v-if="eyebrow"
      class="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
      :class="light ? 'text-gold-300' : 'text-gold-800'"
    >
      {{ eyebrow }}
    </p>
    <h2 class="text-3xl font-semibold sm:text-4xl" :class="light ? 'text-white' : 'text-navy-900'">{{ title }}</h2>
    <p v-if="subtitle" class="mt-4 text-lg leading-relaxed" :class="light ? 'text-navy-100' : 'text-navy-700'">
      {{ subtitle }}
    </p>
  </div>
</template>
