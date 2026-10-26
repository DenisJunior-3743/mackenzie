import { media } from './media'

export const programs = [
  {
    slug: 'education',
    title: 'Education Support',
    icon: 'lucide:graduation-cap',
    image: media.school,
    imageAlt: 'Children in school uniform walking together',
    summary:
      'We provide quality education, school supplies, and tuition assistance to help children grow academically.',
    points: ['Quality education', 'School supplies', 'Tuition assistance'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare & Well-being',
    icon: 'lucide:stethoscope',
    image: media.outreach,
    imageAlt: 'Smiling children holding toothbrushes and hygiene supplies',
    summary:
      'Our healthcare program offers medical checkups, emotional support, and healthy nutrition for every child.',
    points: ['Medical checkups', 'Emotional support', 'Healthy nutrition'],
  },
  {
    slug: 'shelter',
    title: 'Shelter & Basic Needs',
    icon: 'lucide:house',
    image: media.feeding,
    imageAlt: 'Children sharing a meal together',
    summary:
      'We ensure safe, clean, and nurturing housing, along with essential daily needs like food and clothing.',
    points: ['Safe, clean housing', 'Daily meals', 'Clothing'],
  },
  {
    slug: 'skills',
    title: 'Skills Training & Development',
    icon: 'lucide:scissors',
    image: media.group,
    imageAlt: 'A group of children outside their centre',
    summary:
      'We equip children with practical skills including computer use, crafts, and vocational training for independence.',
    points: ['Computer use', 'Crafts', 'Vocational training'],
  },
]
