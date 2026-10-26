// Site-wide facts in one place. Edit here and every page/footer updates.
export const site = {
  name: 'Mackenzie Foundation',
  tagline: 'Empowering lives',
  description:
    'Mackenzie Foundation provides shelter, education, healthcare and love to orphaned children in Uganda and Kenya.',

  contact: {
    email: 'christophermackenziefoundation@gmail.com',
    address: 'P.O Box 4277-30200 Bidii, Kenya',
    phones: [{ display: '0725 313 912', tel: '+254725313912' }],
  },

  // Where the home is. Drives the map on /about#where and the "Open in Google Maps" links.
  // Coordinates come from the Google Maps pin the foundation shared.
  location: {
    name: 'Bidii, Pombo, Trans Nzoia County',
    lat: 1.055579,
    lng: 35.026727,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=1.055579,35.026727',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1.055579,35.026727',
  },

  // Only entries with a `url` are shown in the footer. Fill them in when the pages exist.
  social: [
    { label: 'Facebook', icon: 'lucide:facebook', url: '' },
    { label: 'X (Twitter)', icon: 'lucide:twitter', url: '' },
    { label: 'Instagram', icon: 'lucide:instagram', url: '' },
    { label: 'LinkedIn', icon: 'lucide:linkedin', url: '' },
  ],

  // Shown to donors after they pledge on /donate/now.
  // TODO: fill in the real numbers. Empty values show "contact us for details" instead.
  payments: {
    mtn: { label: 'MTN Mobile Money', accountName: 'Mackenzie Foundation', number: '' },
    airtel: { label: 'Airtel Money', accountName: 'Mackenzie Foundation', number: '' },
    bank: {
      label: 'Bank transfer',
      bankName: 'Stanbic Bank Uganda',
      accountName: 'Mackenzie Foundation',
      accountNumber: '',
      branch: 'Kampala Main Branch',
    },
  },
} as const
