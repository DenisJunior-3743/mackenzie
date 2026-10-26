<script setup lang="ts">
import type { ImageOptions } from '~/composables/useCloudinary'

// <CloudImage src="mackenzie/welfare" alt="..." ratio="4:3" sizes="(min-width: 1024px) 33vw, 100vw" />
// Asks Cloudinary for several widths and lets the browser pick the smallest that looks sharp.
const props = withDefaults(
  defineProps<{
    src: string // Cloudinary public ID
    alt: string
    ratio?: string // crop to this aspect ratio on Cloudinary's side, e.g. '16:9'
    sizes?: string // how wide the image is displayed — helps the browser choose
    widths?: number[]
    gravity?: ImageOptions['gravity']
    eager?: boolean // true for images visible on first paint (hero, logo)
  }>(),
  { sizes: '100vw', widths: () => [400, 800, 1200, 1600], gravity: 'auto' },
)

const { url, srcset } = useCloudinary()

const options = computed<ImageOptions>(() => ({
  ar: props.ratio,
  gravity: props.ratio ? props.gravity : undefined,
  crop: props.ratio ? 'lfill' : 'limit',
}))
const fallbackWidth = computed(() => props.widths[Math.min(1, props.widths.length - 1)])
</script>

<template>
  <img
    :src="url(src, { ...options, w: fallbackWidth })"
    :srcset="srcset(src, widths, options)"
    :sizes="sizes"
    :alt="alt"
    :style="ratio ? { aspectRatio: ratio.replace(':', ' / ') } : undefined"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : 'auto'"
    decoding="async"
  />
</template>
