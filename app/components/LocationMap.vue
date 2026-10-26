<script setup lang="ts">
// Interactive map of our home (OpenStreetMap tiles via Leaflet). Leaflet needs the browser, so it is
// loaded inside onMounted: the server only renders the placeholder below, which also serves anyone
// without JavaScript. The pin position comes from data/site.ts.
import type { Map as LeafletMap } from 'leaflet'
import { site } from '~/data/site'

const { lat, lng, name, googleMapsUrl } = site.location

const el = ref<HTMLElement>()
const ready = ref(false)
const failed = ref(false)
let map: LeafletMap | undefined

onMounted(async () => {
  if (!el.value) return
  try {
    const [L] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')])
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches

    map = L.map(el.value, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false, // enabled while the map has focus, so scrolling the page never gets "stuck" on it
      dragging: !L.Browser.mobile, // one-finger drag scrolls the page on phones; pinch and the +/- buttons still work
      zoomAnimation: !calm,
      fadeAnimation: !calm,
      markerZoomAnimation: !calm,
    })
    map.on('focus', () => map?.scrollWheelZoom.enable())
    map.on('blur', () => map?.scrollWheelZoom.disable())

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Brand-coloured pin (an inline SVG, so no marker image files to bundle or break).
    const pin = L.divIcon({
      className: '',
      html: `<svg viewBox="0 0 40 52" width="40" height="52" aria-hidden="true" style="filter:drop-shadow(0 3px 3px rgb(7 22 54 / .35))">
        <path d="M20 2C10.6 2 3 9.6 3 19c0 12.5 17 31 17 31s17-18.5 17-31C37 9.6 29.4 2 20 2Z" fill="#0c2250" stroke="#ffd24d" stroke-width="2.5"/>
        <circle cx="20" cy="19" r="7" fill="#fdb913"/></svg>`,
      iconSize: [40, 52],
      iconAnchor: [20, 50],
      popupAnchor: [0, -46],
    })
    const popup = document.createElement('div')
    const title = document.createElement('strong')
    title.textContent = site.name
    popup.append(title, document.createElement('br'), name)

    L.marker([lat, lng], { icon: pin, title: name, alt: name })
      .addTo(map)
      .bindPopup(popup, { autoPan: false, closeButton: false })
      .openPopup()

    ready.value = true
  } catch {
    failed.value = true // blocked script/CSS or no network: the placeholder stays with its Google Maps link
  }
})

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <!-- `isolate` keeps Leaflet's high z-indexes inside this box so the map never paints over the sticky header -->
  <div class="isolate relative h-80 overflow-hidden rounded-3xl bg-navy-50 shadow-soft ring-1 ring-navy-100 sm:h-96 lg:h-[28rem]">
    <div ref="el" class="size-full" role="region" :aria-label="`Map showing ${name}`" />

    <div v-if="!ready" class="absolute inset-0 grid place-items-center p-6 text-center">
      <div>
        <Icon name="lucide:map-pin" size="36" class="mx-auto text-gold-600" />
        <p class="mt-3 font-semibold text-navy-900">{{ name }}</p>
        <p class="mt-1 text-sm text-navy-700">{{ failed ? 'The map could not be loaded.' : 'Loading map…' }}</p>
        <a :href="googleMapsUrl" target="_blank" rel="noopener" class="mt-3 inline-block text-sm font-semibold text-navy-900 underline">
          Open in Google Maps
        </a>
      </div>
    </div>
  </div>
</template>
