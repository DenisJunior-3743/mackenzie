<script setup lang="ts">
// One button for the whole site. Renders a <NuxtLink> (internal page), an <a> (mailto:, https:) or a <button>.
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'gold' | 'navy' | 'outline' | 'outline-light'
    size?: 'md' | 'lg'
  }>(),
  { variant: 'gold', size: 'md' },
)

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))

const variants = {
  gold: 'bg-gold-400 text-navy-950 shadow-sm hover:bg-gold-300 hover:-translate-y-0.5',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5',
  outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white',
  'outline-light': 'border-2 border-white/70 text-white hover:bg-white hover:text-navy-900',
}
const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    class="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </component>
</template>
