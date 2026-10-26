<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Donate now',
  description: 'Give once, monthly or yearly to support orphaned children in Uganda and Kenya.',
})

type Currency = 'UGX' | 'USD'
type Frequency = 'once' | 'monthly' | 'yearly'
type Method = 'mtn' | 'airtel' | 'bank'

const presets: Record<Currency, number[]> = { UGX: [50_000, 100_000, 200_000, 500_000], USD: [10, 25, 50, 100] }
const minimum: Record<Currency, number> = { UGX: 5_000, USD: 1 }
const frequencies: { value: Frequency; label: string; phrase: string }[] = [
  { value: 'once', label: 'One-time', phrase: '' },
  { value: 'monthly', label: 'Monthly', phrase: 'every month' },
  { value: 'yearly', label: 'Yearly', phrase: 'every year' },
]
const methods: { value: Method; label: string; hint: string; icon: string }[] = [
  { value: 'mtn', label: 'MTN Mobile Money', hint: 'Pay from your phone', icon: 'lucide:smartphone' },
  { value: 'airtel', label: 'Airtel Money', hint: 'Pay from your phone', icon: 'lucide:smartphone' },
  { value: 'bank', label: 'Bank transfer', hint: 'From your bank or app', icon: 'lucide:landmark' },
]

// ---- state: every ref/reactive here is something the page can react to -------------------------
const currency = ref<Currency>('UGX')
const frequency = ref<Frequency>('once')
const amount = ref<number | null>(presets.UGX[1] ?? null)
const customText = ref('') // what the donor typed in "Other amount"
const method = ref<Method>('mtn')
const form = reactive({ firstName: '', lastName: '', email: '', phone: '' })
const attempted = ref(false) // show validation messages only after the first submit
const done = ref(false)

// Pre-fill from links like /donate/now?currency=USD&amount=25&frequency=monthly.
// Pre-rendered pages hydrate WITHOUT the query string and receive it a moment later, so we apply it
// when the component mounts (client-side navigation) and again whenever the query changes (direct load).
const route = useRoute()
function applyQuery() {
  const { currency: c, amount: a, frequency: f } = route.query
  if (!c && !a && !f) return
  if (c === 'USD' || c === 'UGX') currency.value = c
  if (f === 'once' || f === 'monthly' || f === 'yearly') frequency.value = f
  const n = Number(a)
  if (n > 0) {
    amount.value = n
    customText.value = presets[currency.value].includes(n) ? '' : n.toLocaleString('en-US')
  } else {
    amount.value = presets[currency.value][1] ?? null
  }
}
onMounted(applyQuery)
watch(() => route.query, applyQuery)

function setCurrency(c: Currency) {
  currency.value = c
  amount.value = presets[c][1] ?? null
  customText.value = ''
}
function pickPreset(n: number) {
  amount.value = n
  customText.value = ''
}
function onCustomInput(raw: string) {
  const digits = raw.replace(/\D/g, '')
  amount.value = digits ? Number(digits) : null
  customText.value = digits ? Number(digits).toLocaleString('en-US') : ''
}

// ---- derived values: recalculated automatically when the refs above change --------------------
const phrase = computed(() => frequencies.find((f) => f.value === frequency.value)?.phrase ?? '')
const money = computed(() => (amount.value ? formatMoney(amount.value, currency.value) : '—'))
const mobile = computed(() => (method.value === 'airtel' ? site.payments.airtel : site.payments.mtn))
const methodLabel = computed(() => methods.find((m) => m.value === method.value)?.label ?? '')

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (!amount.value || amount.value < minimum[currency.value])
    e.amount = `The minimum gift is ${formatMoney(minimum[currency.value], currency.value)}.`
  if (!form.firstName.trim()) e.firstName = 'Please enter your first name.'
  if (!form.lastName.trim()) e.lastName = 'Please enter your last name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Please enter a valid email address.'
  if (method.value !== 'bank' && !/^\+?\d{9,15}$/.test(form.phone.replace(/[\s-]/g, '')))
    e.phone = 'Enter the number you will pay from, e.g. 0772 123 456.'
  return e
})
const show = (field: string) => (attempted.value ? errors.value[field] : undefined)

const confirmHref = computed(() => {
  const lines = [
    `Hello Mackenzie Foundation,`,
    ``,
    `I would like to give ${money.value} ${phrase.value}`.trim() + ` by ${methodLabel.value}.`,
    ``,
    `Name: ${form.firstName} ${form.lastName}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : '',
  ].filter((l, i, all) => l !== '' || all[i - 1] !== '')
  return `mailto:${site.contact.email}?subject=${encodeURIComponent('My donation')}&body=${encodeURIComponent(lines.join('\n'))}`
})

async function submit() {
  attempted.value = true
  if (Object.keys(errors.value).length) {
    await nextTick()
    document.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"]')?.focus()
    return
  }
  done.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function reset() {
  done.value = false
  attempted.value = false
}

const inputClass =
  'mt-1.5 w-full rounded-xl border-2 border-navy-200 bg-white px-4 py-3 text-navy-950 placeholder:text-navy-400 focus:border-navy-600 focus:outline-none aria-[invalid=true]:border-red-600'
const sectionTitle = 'flex items-center gap-3 text-xl font-semibold text-navy-900'
const stepBadge = 'grid size-8 place-items-center rounded-full bg-navy-900 font-sans text-sm text-white'
</script>

<template>
  <div>
    <PageHero compact title="Make your donation" subtitle="Every gift gives a child shelter, education and hope." />

    <div class="container-page py-12 sm:py-16">
      <!-- THANK-YOU / PAYMENT INSTRUCTIONS -->
      <section v-if="done" class="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-navy-100 sm:p-12" aria-live="polite">
        <span class="mx-auto grid size-16 place-items-center rounded-full bg-gold-100 text-gold-800"><Icon name="lucide:heart-handshake" size="32" /></span>
        <h2 class="mt-5 text-3xl font-semibold text-navy-900">Thank you, {{ form.firstName }}!</h2>
        <p class="mt-3 text-lg text-navy-700">
          You’re giving <strong class="text-navy-900">{{ money }}</strong> {{ phrase }}. Please complete your gift with the details below.
        </p>

        <div class="mt-8 rounded-2xl bg-cream p-6 text-left ring-1 ring-navy-100">
          <h3 class="text-lg font-semibold text-navy-900">1. Send your gift — {{ methodLabel }}</h3>
          <dl v-if="method === 'bank'" class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-navy-800">
            <dt class="font-medium">Bank</dt><dd>{{ site.payments.bank.bankName }}</dd>
            <dt class="font-medium">Account name</dt><dd>{{ site.payments.bank.accountName }}</dd>
            <dt class="font-medium">Account no.</dt>
            <dd>{{ site.payments.bank.accountNumber || 'Please contact us for the account number' }}</dd>
            <dt class="font-medium">Branch</dt><dd>{{ site.payments.bank.branch }}</dd>
          </dl>
          <dl v-else class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-navy-800">
            <dt class="font-medium">Send to</dt>
            <dd>{{ mobile.number || 'Please contact us for the number' }}</dd>
            <dt class="font-medium">Name</dt><dd>{{ mobile.accountName }}</dd>
          </dl>
          <p class="mt-3 text-sm text-navy-700">
            Questions? Call
            <a :href="`tel:${site.contact.phones[0].tel}`" class="font-semibold underline">{{ site.contact.phones[0].display }}</a>.
          </p>
        </div>

        <div class="mt-4 rounded-2xl bg-cream p-6 text-left ring-1 ring-navy-100">
          <h3 class="text-lg font-semibold text-navy-900">2. Let us know</h3>
          <p class="mt-2 text-navy-800">Email us so we can thank you and acknowledge your gift. We’ve written the message for you.</p>
          <BaseButton :href="confirmHref" class="mt-4"><Icon name="lucide:mail" size="18" /> Send confirmation email</BaseButton>
        </div>

        <button type="button" class="mt-8 font-semibold text-navy-700 underline hover:text-navy-950" @click="reset">
          ← Change my gift
        </button>
      </section>

      <!-- FORM -->
      <form v-else class="grid items-start gap-8 lg:grid-cols-[1fr_22rem]" novalidate @submit.prevent="submit">
        <div class="space-y-6">
          <!-- 1. Amount -->
          <section class="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy-100 sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 :class="sectionTitle"><span :class="stepBadge">1</span> Choose an amount</h2>
              <div class="inline-flex rounded-full bg-navy-50 p-1" role="group" aria-label="Currency">
                <button
                  v-for="c in (['UGX', 'USD'] as const)"
                  :key="c"
                  type="button"
                  class="rounded-full px-4 py-1.5 text-sm font-semibold transition"
                  :class="currency === c ? 'bg-navy-900 text-white' : 'text-navy-700 hover:text-navy-950'"
                  :aria-pressed="currency === c"
                  @click="setCurrency(c)"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                v-for="n in presets[currency]"
                :key="n"
                type="button"
                class="rounded-xl border-2 px-2 py-3.5 text-base font-semibold transition"
                :class="amount === n && !customText ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 text-navy-900 hover:border-navy-600'"
                :aria-pressed="amount === n && !customText"
                @click="pickPreset(n)"
              >
                {{ formatMoney(n, currency) }}
              </button>
            </div>

            <label class="mt-4 block text-sm font-medium text-navy-800">
              Other amount
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 mt-0.5 -translate-y-1/2 text-navy-500">{{ currency }}</span>
                <input
                  :value="customText"
                  inputmode="numeric"
                  autocomplete="off"
                  placeholder="Enter amount"
                  :class="inputClass"
                  class="pl-16"
                  :aria-invalid="!!show('amount')"
                  @input="onCustomInput(($event.target as HTMLInputElement).value)"
                />
              </div>
            </label>
            <p v-if="show('amount')" class="mt-2 text-sm font-medium text-red-700" role="alert">{{ show('amount') }}</p>
          </section>

          <!-- 2. Frequency -->
          <section class="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy-100 sm:p-8">
            <h2 :class="sectionTitle"><span :class="stepBadge">2</span> How often?</h2>
            <div class="mt-5 grid grid-cols-3 gap-3">
              <label v-for="f in frequencies" :key="f.value">
                <input v-model="frequency" type="radio" name="frequency" :value="f.value" class="peer sr-only" />
                <span
                  class="block cursor-pointer rounded-xl border-2 border-navy-200 py-3.5 text-center font-semibold text-navy-900 transition hover:border-navy-600 peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500"
                >
                  {{ f.label }}
                </span>
              </label>
            </div>
          </section>

          <!-- 3. Details -->
          <section class="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy-100 sm:p-8">
            <h2 :class="sectionTitle"><span :class="stepBadge">3</span> About you</h2>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="text-sm font-medium text-navy-800" for="firstName">First name</label>
                <input id="firstName" v-model="form.firstName" autocomplete="given-name" :class="inputClass" :aria-invalid="!!show('firstName')" />
                <p v-if="show('firstName')" class="mt-1.5 text-sm text-red-700">{{ show('firstName') }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-navy-800" for="lastName">Last name</label>
                <input id="lastName" v-model="form.lastName" autocomplete="family-name" :class="inputClass" :aria-invalid="!!show('lastName')" />
                <p v-if="show('lastName')" class="mt-1.5 text-sm text-red-700">{{ show('lastName') }}</p>
              </div>
              <div class="sm:col-span-2">
                <label class="text-sm font-medium text-navy-800" for="email">Email</label>
                <input id="email" v-model="form.email" type="email" autocomplete="email" :class="inputClass" :aria-invalid="!!show('email')" />
                <p v-if="show('email')" class="mt-1.5 text-sm text-red-700">{{ show('email') }}</p>
              </div>
            </div>
          </section>

          <!-- 4. Payment method -->
          <section class="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy-100 sm:p-8">
            <h2 :class="sectionTitle"><span :class="stepBadge">4</span> How would you like to pay?</h2>
            <div class="mt-5 grid gap-3 sm:grid-cols-3">
              <label v-for="m in methods" :key="m.value">
                <input v-model="method" type="radio" name="method" :value="m.value" class="peer sr-only" />
                <span
                  class="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-navy-200 p-4 text-center transition hover:border-navy-600 peer-checked:border-navy-900 peer-checked:bg-navy-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500"
                >
                  <Icon :name="m.icon" size="26" class="text-navy-800" />
                  <span class="font-semibold text-navy-900">{{ m.label }}</span>
                  <span class="text-xs text-navy-600">{{ m.hint }}</span>
                </span>
              </label>
            </div>
            <p class="mt-3 flex items-center gap-2 text-sm text-navy-600">
              <Icon name="lucide:info" size="16" class="shrink-0" /> Card payments are coming soon.
            </p>

            <div v-if="method !== 'bank'" class="mt-5">
              <label class="text-sm font-medium text-navy-800" for="phone">{{ methodLabel }} number</label>
              <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="0772 123 456" :class="inputClass" :aria-invalid="!!show('phone')" />
              <p v-if="show('phone')" class="mt-1.5 text-sm text-red-700">{{ show('phone') }}</p>
            </div>
          </section>
        </div>

        <!-- Summary (sticks while scrolling on large screens) -->
        <aside class="rounded-3xl bg-navy-900 p-7 text-white shadow-soft lg:sticky lg:top-28">
          <p class="text-sm font-semibold uppercase tracking-widest text-gold-300">Your gift</p>
          <p class="mt-3 font-display text-4xl font-semibold" aria-live="polite">{{ money }}</p>
          <p class="mt-1 text-navy-100">
            {{ frequency === 'once' ? 'One-time gift' : phrase.charAt(0).toUpperCase() + phrase.slice(1) }} · {{ methodLabel }}
          </p>
          <BaseButton type="submit" size="lg" class="mt-6 w-full">
            <Icon name="lucide:heart" size="20" /> Continue
          </BaseButton>
          <ul class="mt-6 space-y-3 text-sm text-navy-100">
            <li class="flex gap-2.5"><Icon name="lucide:shield-check" size="18" class="mt-0.5 shrink-0 text-gold-300" /> We never ask for card details on this site.</li>
            <li class="flex gap-2.5"><Icon name="lucide:mail" size="18" class="mt-0.5 shrink-0 text-gold-300" /> Next, you’ll get the payment details and an email to confirm your gift.</li>
          </ul>
        </aside>
      </form>
    </div>
  </div>
</template>
