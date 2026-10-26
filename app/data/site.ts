// Site-wide facts in one place. Edit here and every page/footer updates.
export const site = {
  name: 'Mackenzie Foundation',
  tagline: 'Empowering lives',
  description:
    'Mackenzie Foundation provides shelter, education, healthcare and love to orphaned children in Uganda and Kenya.',

  contact: {
    // TODO: confirm — the old site listed both info@mackenzie.org and info@mackenzieorphanage.org
    email: 'info@mackenzieorphanage.org',
    address: 'Kampala, Uganda',
    phones: [
      { display: '0778 602 468', tel: '+256778602468' },
      { display: '0701 300 966', tel: '+256701300966' },
    ],
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
