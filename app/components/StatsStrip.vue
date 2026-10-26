<script setup lang="ts">
import { stats } from '~/data/impact'
</script>

<template>
  <div class="grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-4">
    <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center text-center sm:flex-row sm:text-left">
      <span class="mb-3 grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-100 text-gold-800 sm:mb-0 sm:mr-4">
        <Icon :name="stat.icon" size="24" />
      </span>
      <div>
        <p class="font-display text-3xl font-semibold text-navy-900">
          <AnimatedNumber :value="stat.value" :suffix="stat.suffix" />
        </p>
        <p class="text-sm text-navy-700">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>
