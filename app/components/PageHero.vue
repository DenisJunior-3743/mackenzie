<script setup lang="ts">
// Banner at the top of inner pages. `image` is a Cloudinary public ID.
// Anything placed inside the tag (the default slot) is shown as buttons under the text.
defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
  image?: string
  imageAlt?: string
  compact?: boolean
}>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-navy-950 text-white">
    <CloudImage
      v-if="image"
      :src="image"
      :alt="imageAlt ?? ''"
      eager
      class="absolute inset-0 -z-20 size-full object-cover opacity-50"
    />
    <div v-if="image" class="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950/90" />
    <div v-else class="hero-glow absolute inset-0 -z-10" />
    <div class="container-page text-center" :class="compact ? 'py-12 sm:py-16' : 'py-20 sm:py-28'">
      <p v-if="eyebrow" class="animate-fade-up mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
        {{ eyebrow }}
      </p>
      <h1 class="animate-fade-up mx-auto max-w-3xl text-4xl font-semibold sm:text-5xl [animation-delay:80ms]">
        {{ title }}
      </h1>
      <p
        v-if="subtitle"
        class="animate-fade-up mx-auto mt-5 max-w-2xl text-lg text-navy-100 [animation-delay:160ms]"
      >
        {{ subtitle }}
      </p>
      <div v-if="$slots.default" class="animate-fade-up mt-8 flex flex-wrap justify-center gap-4 [animation-delay:240ms]">
        <slot />
      </div>
      <div v-else class="mx-auto mt-8 h-1 w-16 rounded-full bg-gold-400" />
    </div>
  </section>
</template>
