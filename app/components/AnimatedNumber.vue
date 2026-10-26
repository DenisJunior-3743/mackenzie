<script setup lang="ts">
// Counts up from 0 the first time it scrolls into view.
const props = withDefaults(defineProps<{ value: number; suffix?: string; duration?: number }>(), {
  suffix: '',
  duration: 1400,
})

const root = ref<HTMLElement>()
// Start at the real number: the server-rendered HTML (and anyone without JS) sees the right value.
const shown = ref(props.value)
let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = root.value
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (el.getBoundingClientRect().top < window.innerHeight) return // already visible: don't flicker

  shown.value = 0
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / props.duration, 1)
        shown.value = Math.round(props.value * (1 - (1 - t) ** 3)) // ease-out
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    },
    { threshold: 0.4 },
  )
  observer.observe(el)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span ref="root">{{ shown }}{{ suffix }}</span>
</template>
