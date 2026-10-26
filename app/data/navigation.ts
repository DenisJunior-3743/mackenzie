export interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string }[]
}

// Drives both the desktop dropdowns and the mobile menu.
export const navigation: NavItem[] = [
  {
    label: 'Programs',
    to: '/programs',
    children: [
      { label: 'Education Support', to: '/programs#education' },
      { label: 'Healthcare & Well-being', to: '/programs#healthcare' },
      { label: 'Shelter & Basic Needs', to: '/programs#shelter' },
      { label: 'Skills Training', to: '/programs#skills' },
    ],
  },
  {
    label: 'Get Involved',
    to: '/get-involved',
    children: [
      { label: 'Volunteer', to: '/get-involved#volunteer' },
      { label: 'Partnerships', to: '/get-involved#partnerships' },
      { label: 'Fundraise', to: '/get-involved#fundraise' },
    ],
  },
  {
    label: 'Ways to Give',
    to: '/donate',
    children: [
      { label: 'How to Donate', to: '/donate' },
      { label: 'Financial Donations', to: '/donate#financial' },
      { label: 'Material Donations', to: '/donate#material' },
    ],
  },
  { label: 'News & Events', to: '/news' },
  { label: 'About', to: '/about' },
]
