# Learning Vue & Nuxt — a guide for React developers

This guide teaches you Vue 3, Nuxt 4 and Tailwind CSS v4 **using this very website**. Every idea points at a real file you can open, so read it with the project open in VS Code and the dev server running (`npm run dev`).

**Assumed background:** you know React (components, props, state, hooks, JSX). You don't need to know anything about Vue.

**How to read it:** sections 1–4 are Vue. Section 5 is what Nuxt adds on top. Sections 6–7 are Tailwind and Cloudinary. Section 8 is deployment. Sections 9–10 are recipes and gotchas — skim them now, come back when you need them.

---

## Contents

1. [The big picture](#1-the-big-picture)
2. [React → Vue cheat sheet](#2-react--vue-cheat-sheet)
3. [Anatomy of a component](#3-anatomy-of-a-component)
4. [Reactivity: `ref`, `computed`, `watch`](#4-reactivity-ref-computed-watch)
5. [What Nuxt adds](#5-what-nuxt-adds)
6. [Tailwind CSS v4 in ten minutes](#6-tailwind-css-v4-in-ten-minutes)
7. [Cloudinary in this project](#7-cloudinary-in-this-project)
8. [Build & deploy](#8-build--deploy)
9. [Recipes](#9-recipes)
10. [Gotchas that bite React developers](#10-gotchas-that-bite-react-developers)
11. [Where to go next](#11-where-to-go-next)

---

## 1. The big picture

| Layer | What it is | React equivalent |
| --- | --- | --- |
| **Vue** | The UI library: components, reactivity, templates | React |
| **Nuxt** | The framework around Vue: routing, layouts, server rendering, build, deployment | Next.js |
| **Tailwind** | Utility CSS classes (`flex`, `px-4`, `text-navy-900`) | Tailwind works the same everywhere |
| **Cloudinary** | Hosts images and resizes/compresses them on demand | Same |
| **Vercel** | Hosts the built site | Same |

**The one mental-model difference that matters most**

> In React, your component function **re-runs on every render**, so you need dependency arrays, `useMemo`, `useCallback`, and you can hit stale closures.
>
> In Vue, `<script setup>` runs **once** when the component is created. Vue *tracks which reactive values each piece of the template and each `computed` actually reads*, and updates only those. There are no dependency arrays and no stale closures.

If you keep one sentence in your head: **"setup runs once; reactivity does the rest."**

---

## 2. React → Vue cheat sheet

| You want to… | React | Vue 3 (this project) |
| --- | --- | --- |
| Markup | JSX | HTML-like `<template>` |
| Local state | `const [n, setN] = useState(0)` | `const n = ref(0)` → change with `n.value++` |
| Derived value | `useMemo(() => a + b, [a, b])` | `computed(() => a.value + b.value)` |
| Run on mount | `useEffect(() => {…}, [])` | `onMounted(() => {…})` |
| Cleanup | `return () => …` inside `useEffect` | `onBeforeUnmount(() => …)` |
| React to a change | `useEffect(() => {…}, [x])` | `watch(x, () => {…})` |
| Props | `function Card({ title })` | `defineProps<{ title: string }>()` |
| `children` | `{children}` | `<slot />` |
| Conditional | `{ok && <A/>}` / `{ok ? <A/> : <B/>}` | `<A v-if="ok" />` / `<B v-else />` |
| List | `items.map(i => <li key={i.id}/>)` | `<li v-for="i in items" :key="i.id">` |
| CSS class | `className="a b"` | `class="a b"` |
| Dynamic attribute | `src={url}` | `:src="url"` |
| Event | `onClick={() => go()}` | `@click="go()"` |
| Controlled input | `value={v} onChange={e => setV(e.target.value)}` | `<input v-model="v">` |
| Shared logic | custom hook `useThing()` | **composable** `useThing()` — same idea |
| Context | `createContext` / `useContext` | `provide` / `inject` (not needed in this project) |
| Routing | Next.js `pages/` or React Router | Nuxt `pages/` (file-based) |
| Page `<head>` | `next/head` | `useHead()` / `useSeoMeta()` |
| Env vars | `process.env.NEXT_PUBLIC_X` | `useRuntimeConfig().public.x` |

---

## 3. Anatomy of a component

A Vue component is one `.vue` file ("Single-File Component") with up to three blocks:

```vue
<script setup lang="ts">   <!-- logic: runs once per component instance -->
</script>

<template>                  <!-- markup -->
</template>

<style>                     <!-- CSS (we don't use it: Tailwind classes go in the template) -->
</style>
```

Open [`app/components/BaseButton.vue`](../app/components/BaseButton.vue). It's the smallest "real" component here and shows most of the core ideas:

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'gold' | 'navy' | 'outline' | 'outline-light'
    size?: 'md' | 'lg'
  }>(),
  { variant: 'gold', size: 'md' },        // default prop values
)

// Render a link, an <a>, or a <button> depending on which props were passed:
const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))

const variants = { gold: 'bg-gold-400 …', navy: 'bg-navy-900 …', /* … */ }
</script>

<template>
  <component :is="tag" :to="to" :href="href" :class="[variants[variant], sizes[size]]">
    <slot />                                <!-- like {children} in React -->
  </component>
</template>
```

What to notice:

- **No imports for `computed`, `resolveComponent`, `NuxtLink`.** Nuxt auto-imports them (more in §5).
- **Props are declared with a TypeScript type.** Inside `<script>` you read `props.variant`; inside `<template>` you just write `variant`.
- **`<component :is="tag">`** renders whatever element/component `tag` evaluates to. It's how one button can be a link *or* a button. (React: `const Tag = …; <Tag />`.)
- **`:class="[…]"` takes an array or object** — no `clsx` needed.
- **Fall-through attributes.** When you write `<BaseButton class="w-full" type="submit">`, Vue automatically puts `class` and `type` on the component's **root element**. In React you'd have to destructure `className` and forward it by hand. [`CloudImage.vue`](../app/components/CloudImage.vue) relies on this too: `class="rounded-3xl"` lands on its `<img>`.

### Template syntax you'll see everywhere

```vue
{{ title }}                       <!-- print a value (like {title}) -->
:src="url"                        <!-- bind an attribute to JS (short for v-bind:src) -->
@click="open = !open"             <!-- listen to an event (short for v-on:click) -->
v-if="x" / v-else-if / v-else     <!-- conditional rendering (adds/removes from DOM) -->
v-show="x"                        <!-- toggles display:none, element stays in DOM -->
v-for="item in items" :key="item.id"
v-model="form.email"              <!-- two-way binding for inputs -->
v-bind="event"                    <!-- spread an object as props: see EventCard in news/index.vue -->
<slot />                          <!-- where children go -->
```

Inside `{{ }}` and `:attr="…"` you can write any **expression** (not statements). `@click` accepts a statement, so `@click="mobileOpen = !mobileOpen"` works inline (see `AppHeader.vue`).

---

## 4. Reactivity: `ref`, `computed`, `watch`

This is the heart of Vue. The best place to study it is the donation form: [`app/pages/donate/now.vue`](../app/pages/donate/now.vue).

### `ref` — a reactive box

```ts
const frequency = ref<'once' | 'monthly' | 'yearly'>('once')

frequency.value = 'monthly'      // in <script>: use .value
```
```vue
<p>{{ frequency }}</p>           <!-- in <template>: .value is added for you -->
```

`ref` is `useState`'s counterpart, with one big difference: **you mutate it directly** (`.value = …`), there's no setter function and no re-running of the component.

> The #1 beginner bug: forgetting `.value` in `<script>`. In `<template>` never write `.value`.

### `reactive` — a reactive object

```ts
const form = reactive({ firstName: '', lastName: '', email: '', phone: '' })
form.email = 'a@b.com'            // no .value on reactive objects
```
`<input v-model="form.email">` then keeps it in sync both ways. **Don't destructure** a `reactive` object (`const { email } = form`) — you'd copy the value and lose reactivity.

### `computed` — derived values (≈ `useMemo`, but automatic)

```ts
const money = computed(() => (amount.value ? formatMoney(amount.value, currency.value) : '—'))
```
Vue notices `amount` and `currency` are read inside, caches the result, and recalculates only when one of them changes. **No dependency array.** The validation rules are one big `computed` named `errors`; the template reads `errors.email` and updates itself.

### `watch` — run code when something changes (≈ `useEffect` with deps)

```ts
watch(() => route.query, applyQuery)
```
The first argument says *what to watch*: a ref, or a getter function (`() => something.value`). Unlike `useEffect`, the callback does **not** run on first render unless you pass `{ immediate: true }`.

### Lifecycle hooks

```ts
onMounted(() => { /* the component is on screen — touch the DOM here */ })
onBeforeUnmount(() => { /* clean up timers, observers */ })
```
See [`AnimatedNumber.vue`](../app/components/AnimatedNumber.vue): it creates an `IntersectionObserver` in `onMounted` and disconnects it in `onBeforeUnmount`. That's the `useEffect(() => { …; return cleanup }, [])` pattern split into two named hooks.

### Template refs

```vue
<span ref="root">…</span>
```
```ts
const root = ref<HTMLElement>()    // after mount, root.value is the DOM element
```
(React: `useRef` + `ref={…}`.)

---

## 5. What Nuxt adds

Vue alone gives you components. Nuxt turns them into a website. Here's the folder map with the React/Next.js analogy.

```
app/
  app.vue            ← root component (like _app.tsx): <NuxtLayout><NuxtPage/></NuxtLayout>
  error.vue          ← shown for 404/500 errors
  pages/             ← FILE-BASED ROUTING
  layouts/           ← page shells (header + footer around <slot/>)
  components/        ← AUTO-IMPORTED components
  composables/       ← AUTO-IMPORTED functions (hooks)
  utils/             ← AUTO-IMPORTED helpers
  plugins/           ← code that runs once at startup (register a directive, etc.)
  assets/css/        ← global CSS
  data/              ← OUR folder (not a Nuxt convention): the site's content
public/              ← files served as-is at the site root (robots.txt)
nuxt.config.ts       ← framework configuration
```

### 5.1 File-based routing

The file path **is** the URL:

| File | URL |
| --- | --- |
| `pages/index.vue` | `/` |
| `pages/about.vue` | `/about` |
| `pages/donate/index.vue` | `/donate` |
| `pages/donate/now.vue` | `/donate/now` |
| `pages/news/[slug].vue` | `/news/anything` ← **dynamic route** |

In [`pages/news/[slug].vue`](../app/pages/news/%5Bslug%5D.vue) the square brackets make a parameter:

```ts
const route = useRoute()
const article = news.find((a) => a.slug === route.params.slug)   // like useParams() in React Router
if (!article) throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
```

Navigate with `<NuxtLink to="/about">` (client-side navigation, no page reload; like `next/link`). Hash links work too: `to="/programs#education"`. Programmatic navigation: `navigateTo('/donate')`.

### 5.2 Layouts

[`layouts/default.vue`](../app/layouts/default.vue) wraps every page: skip-link, `<AppHeader/>`, `<main><slot/></main>`, `<AppFooter/>`. Pages only contain their own content. Need a different shell for some pages (e.g. an admin area)? Add `layouts/admin.vue` and in the page write `definePageMeta({ layout: 'admin' })`.

### 5.3 Auto-imports

You never write `import { ref } from 'vue'` or `import AppHeader from …` in this project.

- **Vue APIs** (`ref`, `computed`, `watch`, `onMounted`, …) and **Nuxt APIs** (`useRoute`, `useHead`, `useSeoMeta`, `useRuntimeConfig`, `navigateTo`, …) are global.
- **Components** in `app/components/` are available by file name: `BaseButton.vue` → `<BaseButton>`. A nested path becomes part of the name (`components/Card/Header.vue` → `<CardHeader>`).
- **Composables** in `app/composables/` and **utils** in `app/utils/` export functions that are global (`useCloudinary()`, `formatDate()`).
- **Not auto-imported:** `app/data/*`. We import those explicitly: `import { site } from '~/data/site'`. (`~` means "the `app/` folder".) Explicit imports make it obvious where content comes from.

### 5.4 Head, titles and SEO

Each page declares its own metadata, and Nuxt renders it into the HTML (so Google and WhatsApp previews see it):

```ts
useSeoMeta({ title: 'Programs & Services', description: '…' })
```

[`app.vue`](../app/app.vue) defines a `titleTemplate` that turns `"Programs"` into `"Programs · Mackenzie Foundation"`.

### 5.5 Rendering: why the page is already there before JavaScript loads

React single-page apps send an empty `<div id="root">` and build the page in the browser. Nuxt does better:

1. **At build time** (`npm run build`) Nuxt **pre-renders** every page to real HTML (`nitro.prerender` in [`nuxt.config.ts`](../nuxt.config.ts)). `crawlLinks: true` makes it follow `<a>` links, so every `/news/<slug>` page is discovered automatically.
2. The browser receives complete HTML → instant paint, great SEO.
3. Then Vue **hydrates**: it attaches event listeners and reactivity to the existing HTML.

This is why one rule matters (it's the bug we actually hit while building this — see §10): **the first client render must produce the same HTML the server produced.** Anything that depends on the browser (window size, the real URL's query string, `localStorage`) must run in `onMounted` or a `watch`, not at the top of `<script setup>`.

### 5.6 Runtime config & environment variables

```ts
// nuxt.config.ts
runtimeConfig: { public: { cloudinaryCloudName: '' } }
```
```ts
// anywhere
const cloudName = useRuntimeConfig().public.cloudinaryCloudName
```
Nuxt fills it from the env var `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (prefix `NUXT_PUBLIC_` + the camel-case key in SCREAMING_SNAKE_CASE). Anything under `public` is visible in the browser — so **never put secrets there**. That's why the Cloudinary API secret isn't in the Nuxt config at all.

### 5.7 Plugins and custom directives

[`app/plugins/reveal.ts`](../app/plugins/reveal.ts) registers a **custom directive**, `v-reveal`, used like `<div v-reveal="150">`. A directive is a bundle of lifecycle hooks attached to an element (`mounted`, `unmounted`). This one uses `IntersectionObserver` to fade elements in as they scroll into view. (React has no direct equivalent — you'd write a wrapper component or a hook.)

### 5.8 Modules

`modules: ['@nuxt/fonts', '@nuxt/icon']` in `nuxt.config.ts`:

- **`@nuxt/fonts`** downloads Inter and Fraunces at build time and serves them from our own domain.
- **`@nuxt/icon`** gives the `<Icon name="lucide:heart" />` component. The `clientBundle.scan` option finds every `'lucide:…'` string in the source and bundles those icons into the page, so no icon is ever fetched at runtime.

---

## 6. Tailwind CSS v4 in ten minutes

Instead of writing CSS files, you compose small single-purpose classes in the markup:

```html
<a class="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-300">Donate</a>
```

| Class | Means |
| --- | --- |
| `px-5 py-2.5` | horizontal / vertical padding (1 unit = 0.25rem = 4px) |
| `text-sm font-semibold` | font size / weight |
| `bg-gold-400`, `text-navy-950` | colour from our theme |
| `rounded-full` | border-radius: 9999px |
| `flex items-center gap-3` | flexbox, vertical centring, spacing between children |
| `grid grid-cols-2 gap-4` | CSS grid |
| `w-full`, `max-w-6xl`, `size-11` | width, max-width, width+height together |

### Responsive, state and "peer/group" variants

Prefix a class to apply it only in some situation:

```html
<div class="grid gap-6 md:grid-cols-3">      <!-- 1 column on phones, 3 from the "md" breakpoint up -->
<button class="hover:bg-navy-800 focus-visible:outline-2">
<div class="group"> <span class="group-hover:rotate-180"> <!-- reacts to the PARENT's hover -->
<input class="peer sr-only"> <span class="peer-checked:bg-navy-900"> <!-- reacts to the previous sibling's state -->
```

Breakpoints are **mobile-first** (`sm` 640px, `md` 768px, `lg` 1024px). Unprefixed classes apply to phones; add `md:` etc. for bigger screens. The segmented buttons on the donate form use `peer-checked:` so the real, accessible `<input type="radio">` stays in the DOM (hidden with `sr-only`) while a styled `<span>` displays its state.

One-off values use square brackets: `[animation-delay:150ms]`, `aria-[invalid=true]:border-red-600`.

### Our design tokens

[`app/assets/css/main.css`](../app/assets/css/main.css) holds the theme:

```css
@import "tailwindcss";

@theme {
  --color-navy-900: #0c2250;       /* → bg-navy-900, text-navy-900, border-navy-900 … */
  --color-gold-400: #fdb913;
  --font-display: "Fraunces", …;   /* → font-display */
}
```

Everything defined in `@theme` instantly becomes utility classes. **To re-brand the site, change those hex values** — nothing else. The colours were picked from the logo (deep navy + gold).

There's also `@utility container-page { … }` (the standard page gutter/max-width) and `@layer base { … }` (default text colour, heading font).

### The one Tailwind rule that surprises people

Tailwind finds classes by **scanning your files for complete class names**. So this **does not work**:

```ts
const cls = `bg-${color}-500`        // ✗ Tailwind never sees "bg-red-500"
```
Write full names in a lookup, like `variants` in `BaseButton.vue`:

```ts
const variants = { gold: 'bg-gold-400 …', navy: 'bg-navy-900 …' }   // ✓
```

---

## 7. Cloudinary in this project

Cloudinary stores each photo once and resizes, crops and compresses it **on request**, based on the URL:

```
https://res.cloudinary.com/dsdsjjayt/image/upload/f_auto,q_auto,c_lfill,ar_4:3,w_800/mackenzie/welfare
└────────────── delivery ──────────────────────┘ └───────── transformations ────────┘ └── public ID ──┘
```

| Part | Meaning |
| --- | --- |
| `f_auto` | pick the best format for this browser (AVIF/WebP/JPEG) |
| `q_auto` | pick a good quality/size balance |
| `ar_4:3` + `c_lfill` | crop to a 4:3 box (`lfill` = fill, but never upscale) |
| `w_800` | width 800px |
| `mackenzie/welfare` | the **public ID**: folder + filename without extension |

You never build these by hand:

- [`composables/useCloudinary.ts`](../app/composables/useCloudinary.ts) turns options into a URL: `url('mackenzie/welfare', { w: 800 })`.
- [`components/CloudImage.vue`](../app/components/CloudImage.vue) wraps it in an `<img>` with a `srcset` (the same image at 400/800/1200/1600px) so phones download small files and big screens get sharp ones:

```vue
<CloudImage :src="media.feeding" alt="Children sharing a meal" ratio="4:3" sizes="(min-width: 768px) 50vw, 100vw" class="rounded-3xl" />
```

- [`data/media.ts`](../app/data/media.ts) maps friendly names to public IDs (`media.feeding` → `'mackenzie/welfare'`). To swap a photo site-wide, change one line there.

**Uploading.** `npm run upload:media -- ./photos mackenzie` ([`scripts/upload-media.mjs`](../scripts/upload-media.mjs)) uploads every image in a folder using a *signed* request (SHA-1 of the parameters + your API secret, built with Node's `crypto`). It reads the secret from `.env` on **your computer only**.

**Why there's no "upload" button on the website.** An upload endpoint on a public site would let *anyone* store files in your Cloudinary account. If you later want an admin upload page, put it behind a login first.

**Image quality tip.** Cloudinary can shrink but not invent detail. Upload originals ≥ 1600px wide.

**Images load lazily** by default (`loading="lazy"`). Pass `eager` for anything visible on first paint (hero, logo), so it isn't delayed.

---

## 8. Build & deploy

```bash
npm run dev        # development: hot reload, helpful warnings (http://localhost:3000)
npm run build      # production build → .output/  (pre-renders every page)
npm run preview    # serve that build locally
npm run typecheck  # TypeScript across .ts AND .vue files
```

**Vercel.** Connect the GitHub repo; Vercel recognises Nuxt and builds it with `npm run build`. The only setting you add is the env var `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME`. After that:

- push to `main` → production deploy
- open a pull request → a private preview URL to review the change

Because every page is pre-rendered, **changing content (news, events) means a redeploy** — which happens automatically on push. If non-developers need to publish stories themselves, the next step is a CMS (see §11).

---

## 9. Recipes

### Add a news story
Add an object to the top of `app/data/news.ts`. The card on `/news`, the home-page teaser and the `/news/<slug>` page all appear automatically.

### Add a page (e.g. "Our Team")
1. Create `app/pages/team.vue` containing a `<template>` (copy `about.vue` as a starting point).
2. Add `{ label: 'Our Team', to: '/team' }` to `app/data/navigation.ts`.

That's it — routing, header link and prerendering are automatic.

### Add a menu item with a dropdown
In `navigation.ts`, give the item a `children` array. The desktop dropdown and mobile list both read from it.

### Change a colour or font
Edit the tokens in `@theme` in `main.css` (`--color-navy-*`, `--color-gold-*`, `--font-*`). For a new Google font, also add it to `fonts.families` in `nuxt.config.ts`.

### Create a reusable component
Make `app/components/Thing.vue`, then use `<Thing />` anywhere — no import. Start from `SectionHeading.vue` (props + slot-free) or `BaseButton.vue` (variants).

### Change contact details, payment numbers, social links
`app/data/site.ts`. Empty social URLs are hidden; empty payment numbers show "contact us".

### Use a new image
`npm run upload:media -- ./folder mackenzie`, then add `name: 'mackenzie/<filename>'` to `app/data/media.ts`, then `<CloudImage :src="media.name" … />`.

---

## 10. Gotchas that bite React developers

1. **Forgetting `.value`.** In `<script>`, a `ref` needs `.value`. In `<template>`, it never does.
2. **Destructuring loses reactivity.** `const { email } = form` (a `reactive` object) or `const { title } = props` copies the value once. Use `form.email` / `props.title`, or `toRefs`.
3. **Always add `:key` in `v-for`**, with a stable id (not the index when the list can reorder).
4. **Browser-only code at the top of `<script setup>` runs on the server too.** `window`, `document`, `localStorage`, `matchMedia` don't exist there. Put them in `onMounted`.
5. **Hydration mismatch — the bug we hit in this project.** The donate page links look like `/donate/now?currency=USD&amount=25`. Because the page is pre-rendered, Nuxt hydrates it **without the query string** and applies the real URL a moment *after* mounting. Reading `route.query` once in `onMounted` therefore saw an empty query on a direct visit (but worked when you clicked a link inside the site!). The fix, in [`donate/now.vue`](../app/pages/donate/now.vue): apply the query on mount **and** `watch(() => route.query, applyQuery)`. Lesson: test both "click a link" and "paste the URL into a fresh tab".
6. **Dynamic Tailwind class names don't work** (see §6). Use full class strings in lookup objects.
7. **`data/` isn't auto-imported.** If you see "X is not defined" for `site`, `news`, `media`… add `import { … } from '~/data/…'`.
8. **Don't mutate props.** They're read-only. Copy to a local `ref` or emit an event.
9. **Static means rebuild.** A prerendered page doesn't change until the next deploy.
10. **Stale dev server?** If something looks wrong after config or dependency changes, stop `npm run dev`, delete the `.nuxt` folder, run again.

---

## 11. Where to go next

**Learn more (all excellent, free):**
- Vue tutorial: <https://vuejs.org/tutorial/> — 30-minute interactive walkthrough
- Vue docs → *Essentials* and *Reusability (Composables)*: <https://vuejs.org/guide/>
- Nuxt docs → *Getting Started* and *Directory Structure*: <https://nuxt.com/docs>
- Tailwind docs (search any CSS property): <https://tailwindcss.com/docs>
- Cloudinary image transformations: <https://cloudinary.com/documentation/image_transformations>

**Good exercises on this codebase** (small → bigger):
1. Change the gold to a different colour in `main.css` and watch the whole site update.
2. Add a fifth stat to `impact.ts`.
3. Add an "Our Team" page (§9).
4. Add a `<Testimonial>` component and use it on the home page.
5. Add a "Volunteer sign-up" form using `reactive`, `computed` validation and `v-model` — copy the pattern from `donate/now.vue`.
6. Add a language switcher — try the `@nuxtjs/i18n` module.

**Real next steps for the foundation's site:**
- **Online payments**: add a server route (`server/api/…`) that creates a checkout with a gateway that works in Uganda and Kenya (Flutterwave, Pesapal or DPO). The API keys stay on the server; the form stays on the page.
- **Content you can edit without code**: connect a headless CMS (Sanity, Decap, Storyblok) or use Nuxt Content, so news and events can be published from a web form.
- **Contact/volunteer forms** that really send email: a server route + an email API (Resend, Brevo).
- **SEO extras**: `@nuxtjs/sitemap`, structured data, Open Graph images per page.
- **Analytics**: Vercel Analytics or Plausible.
- **Tests**: Vitest + `@nuxt/test-utils` for logic like the donation validation.
