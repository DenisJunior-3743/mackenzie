// A custom directive:  <div v-reveal>  or  <div v-reveal="150">  (150 = delay in ms)
// Elements that start below the fold fade up as they scroll into view.
// Anything already on screen (or for users who prefer reduced motion) is left alone, so
// the page never flashes and the pre-rendered HTML always shows complete content.
export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>()

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    mounted(el, binding) {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (el.getBoundingClientRect().top < window.innerHeight) return

      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          el.classList.add('reveal-in')
          io.disconnect()
        },
        { threshold: 0.12 },
      )
      io.observe(el)
      observers.set(el, io)
    },
    unmounted(el) {
      observers.get(el)?.disconnect()
    },
    // Nothing to add to the server-rendered HTML
    getSSRProps: () => ({}),
  })
})
