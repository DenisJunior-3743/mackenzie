<script setup lang="ts">
import { media } from '~/data/media'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Ways to give',
  description:
    'Give once, sponsor monthly or donate supplies — your support provides shelter, education and hope to orphaned children in Uganda.',
})

// Amount buttons deep-link into the form: /donate/now?currency=USD&amount=25&frequency=monthly
const give = (amount: number, frequency: 'once' | 'monthly' = 'once') =>
  `/donate/now?currency=USD&amount=${amount}&frequency=${frequency}`

const impact = [
  { amount: '$25', text: 'Provides meals for one week', icon: 'lucide:utensils', tone: 'bg-gold-100 text-gold-800' },
  { amount: '$30', text: 'Provides school supplies for one child', icon: 'lucide:book-open', tone: 'bg-navy-100 text-navy-800' },
  { amount: '$50', text: 'Provides medical care', icon: 'lucide:stethoscope', tone: 'bg-blush text-red-800' },
  { amount: '$100', text: 'Provides shelter for one month', icon: 'lucide:house', tone: 'bg-gold-100 text-gold-800' },
]

const materials = [
  { label: 'School supplies', icon: 'lucide:book-open' },
  { label: 'Clothes & shoes', icon: 'lucide:shirt' },
  { label: 'Books & toys', icon: 'lucide:toy-brick' },
  { label: 'Medical supplies', icon: 'lucide:pill' },
]

const materialMail = `mailto:${site.contact.email}?subject=${encodeURIComponent('Material donation')}`
</script>

<template>
  <div>
    <PageHero
      eyebrow="Ways to give"
      title="Make a difference today"
      subtitle="Your support helps us provide shelter, education, and hope to orphaned children in Uganda."
      :image="media.outreach"
      image-alt="Smiling children holding hygiene supplies"
    >
      <BaseButton to="/donate/now" size="lg"><Icon name="lucide:heart" size="20" /> Donate now</BaseButton>
    </PageHero>

    <!-- GIVING OPTIONS -->
    <section class="container-page py-16 sm:py-20">
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- One-time -->
        <article id="financial" v-reveal class="flex scroll-mt-28 flex-col rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-navy-100">
          <span class="mx-auto grid size-16 place-items-center rounded-full bg-blush text-red-700"><Icon name="lucide:heart" size="32" /></span>
          <h2 class="mt-5 text-2xl font-semibold text-navy-900">One-time donation</h2>
          <p class="mt-2 text-navy-700">Make an immediate impact with a single gift.</p>
          <div class="mt-6 grid grid-cols-2 gap-3">
            <NuxtLink
              v-for="n in [10, 25, 50, 100]"
              :key="n"
              :to="give(n)"
              class="rounded-xl border-2 border-navy-200 py-3 font-semibold text-navy-900 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white"
            >
              ${{ n }}
            </NuxtLink>
          </div>
          <div class="mt-auto pt-6">
            <BaseButton to="/donate/now" class="w-full">Choose your amount</BaseButton>
            <p class="mt-3 text-sm text-navy-600">Prefer UGX? You can switch currency on the next page.</p>
          </div>
        </article>

        <!-- Monthly -->
        <article id="monthly" v-reveal="100" class="flex scroll-mt-28 flex-col rounded-3xl bg-navy-900 p-8 text-center text-white shadow-soft">
          <span class="mx-auto grid size-16 place-items-center rounded-full bg-gold-400 text-navy-950"><Icon name="lucide:hand-heart" size="32" /></span>
          <h2 class="mt-5 text-2xl font-semibold">Monthly sponsorship</h2>
          <p class="mt-2 text-navy-100">Provide steady, reliable support month after month.</p>
          <div class="mt-6 grid grid-cols-3 gap-3">
            <NuxtLink
              v-for="n in [30, 50, 100]"
              :key="n"
              :to="give(n, 'monthly')"
              class="rounded-xl border-2 border-white/30 py-3 font-semibold transition hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
            >
              ${{ n }}<span class="text-xs font-normal">/mo</span>
            </NuxtLink>
          </div>
          <div class="mt-auto pt-6">
            <BaseButton :to="give(30, 'monthly')" class="w-full">Become a sponsor</BaseButton>
          </div>
        </article>

        <!-- Material -->
        <article id="material" v-reveal="200" class="flex scroll-mt-28 flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-navy-100">
          <span class="mx-auto grid size-16 place-items-center rounded-full bg-gold-100 text-gold-800"><Icon name="lucide:gift" size="32" /></span>
          <h2 class="mt-5 text-center text-2xl font-semibold text-navy-900">Material donations</h2>
          <p class="mt-2 text-center text-navy-700">Donate supplies, clothes, or other needed items.</p>
          <ul class="mt-6 space-y-3">
            <li v-for="m in materials" :key="m.label" class="flex items-center gap-3 text-navy-900">
              <Icon :name="m.icon" size="22" class="shrink-0 text-gold-600" /> {{ m.label }}
            </li>
          </ul>
          <div class="mt-auto pt-6">
            <BaseButton :href="materialMail" variant="outline" class="w-full">Contact us to donate items</BaseButton>
          </div>
        </article>
      </div>
    </section>

    <!-- IMPACT -->
    <section class="bg-white py-16 sm:py-20">
      <div class="container-page">
        <SectionHeading eyebrow="Your impact" title="Your donation makes a difference" />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(i, idx) in impact" :key="i.amount" v-reveal="idx * 80" class="rounded-3xl bg-cream p-7 text-center ring-1 ring-navy-100">
            <span class="mx-auto grid size-14 place-items-center rounded-2xl" :class="i.tone"><Icon :name="i.icon" size="28" /></span>
            <p class="mt-4 font-display text-3xl font-semibold text-navy-900">{{ i.amount }}</p>
            <p class="mt-1 text-navy-700">{{ i.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
