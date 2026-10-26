<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: () => (notFound.value ? 'Page not found' : 'Something went wrong') })
</script>

<template>
  <NuxtLayout>
    <section class="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p class="font-display text-7xl font-semibold text-gold-500">{{ error.statusCode }}</p>
        <h1 class="mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl">
          {{ notFound ? "We couldn't find that page" : 'Something went wrong' }}
        </h1>
        <p class="mx-auto mt-4 max-w-md text-navy-700">
          {{ notFound ? 'The link may be old or mistyped. Let’s get you back on track.' : 'Please try again in a moment.' }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <BaseButton variant="navy" size="lg" @click="clearError({ redirect: '/' })">Back to home</BaseButton>
          <BaseButton to="/donate" variant="outline" size="lg" @click="clearError()">Ways to give</BaseButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
