<script setup lang="ts">
import { media } from '~/data/media'
import { navigation } from '~/data/navigation'

const route = useRoute()
const mobileOpen = ref(false)

// Close the mobile menu whenever we navigate to another page (or anchor).
watch(() => route.fullPath, () => (mobileOpen.value = false))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-navy-100">
    <!-- Frosted background lives on its own layer so the dropdowns aren't children of a blurred element -->
    <div class="absolute inset-0 -z-10 bg-white/90 backdrop-blur" aria-hidden="true" />
    <div class="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
      <NuxtLink to="/" class="flex items-center gap-3" aria-label="Mackenzie Foundation — home">
        <CloudImage
          :src="media.logo"
          alt=""
          ratio="1:1"
          :widths="[96, 192]"
          sizes="48px"
          eager
          class="size-11 rounded-full ring-2 ring-gold-400 lg:size-12"
        />
        <span class="font-display text-lg font-semibold leading-none text-navy-900">
          Mackenzie
          <span class="mt-1 block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-800">
            Foundation
          </span>
        </span>
      </NuxtLink>

      <!-- Desktop navigation: dropdowns open on hover AND keyboard focus (CSS only) -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">
        <div v-for="item in navigation" :key="item.label" class="group relative">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-navy-800 transition hover:bg-navy-50"
            active-class="bg-navy-50 text-navy-950"
          >
            {{ item.label }}
            <Icon
              v-if="item.children"
              name="lucide:chevron-down"
              size="16"
              class="transition group-hover:rotate-180 group-focus-within:rotate-180"
            />
          </NuxtLink>
          <div
            v-if="item.children"
            class="invisible absolute left-0 top-full w-60 translate-y-1 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ul class="rounded-2xl bg-white p-2 shadow-soft ring-1 ring-navy-100">
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink
                  :to="child.to"
                  class="block rounded-xl px-3 py-2 text-sm text-navy-800 transition hover:bg-gold-50 hover:text-navy-950"
                >
                  {{ child.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="flex items-center gap-2">
        <BaseButton to="/donate/now" class="whitespace-nowrap">
          <Icon name="lucide:heart" size="16" />
          <span>Donate<span class="hidden sm:inline"> now</span></span>
        </BaseButton>
        <button
          type="button"
          class="grid size-11 place-items-center rounded-full text-navy-900 hover:bg-navy-50 lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile navigation -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="mobileOpen"
        id="mobile-menu"
        class="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-100 bg-white lg:hidden"
        aria-label="Mobile"
      >
        <ul class="container-page space-y-1 py-4">
          <li v-for="item in navigation" :key="item.label">
            <NuxtLink :to="item.to" class="block rounded-xl px-3 py-3 text-base font-semibold text-navy-900 hover:bg-navy-50">
              {{ item.label }}
            </NuxtLink>
            <ul v-if="item.children" class="mb-2 ml-3 border-l-2 border-gold-200 pl-3">
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink :to="child.to" class="block rounded-lg px-3 py-2 text-sm text-navy-700 hover:text-navy-950">
                  {{ child.label }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
