<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Get involved',
  description: 'Volunteer, partner with us or fundraise to support orphaned children in Uganda.',
})

const mail = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`

const sections = [
  {
    id: 'volunteer',
    icon: 'lucide:users',
    title: 'Volunteer',
    text: 'Our volunteers are at the heart of what we do — guiding, teaching and simply spending time with the children.',
    points: ['Mentoring and tutoring', 'Skill development workshops', 'Recreational activities', 'Community outreach programs'],
    cta: 'Email us to volunteer',
    href: mail('I would like to volunteer'),
  },
  {
    id: 'partnerships',
    icon: 'lucide:handshake',
    title: 'Partnerships',
    text: 'We work with local healthcare professionals and organizations to deliver medical camps and more. If your organization would like to support our programs, we would love to talk.',
    points: ['Healthcare and medical camps', 'Education and training', 'Donations of supplies and materials'],
    cta: 'Start a conversation',
    href: mail('Partnership enquiry'),
  },
  {
    id: 'fundraise',
    icon: 'lucide:megaphone',
    title: 'Fundraise',
    text: 'Rally friends, family, your school or your workplace behind a child’s future. Tell us what you have in mind and we’ll help you make it happen.',
    points: ['Birthday and celebration fundraisers', 'School and community drives', 'Workplace giving'],
    cta: 'Tell us your idea',
    href: mail('I would like to fundraise'),
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Get involved"
      title="There’s a place for you here"
      subtitle="Give your time, your skills or your voice — every kind of help changes a child’s life."
    />

    <div class="container-page space-y-8 py-16 sm:py-20">
      <section
        v-for="(s, i) in sections"
        :id="s.id"
        :key="s.id"
        v-reveal
        class="scroll-mt-28 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-navy-100 sm:p-10"
      >
        <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div class="flex items-center gap-4">
              <span class="grid size-14 shrink-0 place-items-center rounded-2xl" :class="i === 1 ? 'bg-navy-900 text-gold-300' : 'bg-gold-100 text-gold-800'">
                <Icon :name="s.icon" size="28" />
              </span>
              <h2 class="text-3xl font-semibold text-navy-900">{{ s.title }}</h2>
            </div>
            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-navy-700">{{ s.text }}</p>
            <ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
              <li v-for="p in s.points" :key="p" class="flex items-center gap-3 text-navy-900">
                <Icon name="lucide:circle-check" size="22" class="shrink-0 text-gold-600" /> {{ p }}
              </li>
            </ul>
          </div>
          <BaseButton :href="s.href" size="lg" class="w-full md:w-auto">
            <Icon name="lucide:mail" size="20" /> {{ s.cta }}
          </BaseButton>
        </div>
      </section>

      <p class="text-center text-navy-700">
        Prefer to talk? Call us on
        <a v-for="(p, i) in site.contact.phones" :key="p.tel" :href="`tel:${p.tel}`" class="font-semibold text-navy-900 underline">
          {{ p.display }}<span v-if="i < site.contact.phones.length - 1" class="font-normal no-underline"> or </span>
        </a>.
      </p>
    </div>
  </div>
</template>
