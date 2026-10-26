import { media } from './media'

export interface Article {
  slug: string
  title: string
  date: string // ISO yyyy-mm-dd
  image: string // Cloudinary public ID
  imageAlt: string
  excerpt: string
  intro: string
  items: string[]
  outro: string
}

// Newest first. To publish a story: add an object here — the /news list and /news/<slug> page appear automatically.
export const news: Article[] = [
  {
    slug: 'new-education-program-launched',
    title: 'New Education Program Launched',
    date: '2024-03-15',
    image: media.school,
    imageAlt: 'Children walking to school',
    excerpt:
      'We are excited to announce the launch of our new education program aimed at providing quality education to all our children.',
    intro:
      'We are excited to announce the launch of our new education program aimed at providing quality education to all our children. This program includes:',
    items: [
      'State-of-the-art learning facilities',
      'Qualified and experienced teachers',
      'Personalized learning plans',
      'Extracurricular activities',
      'Digital learning resources',
    ],
    outro:
      'The program has already shown promising results, with children showing improved academic performance and increased enthusiasm for learning. We are committed to providing the best possible education to help our children build a brighter future.',
  },
  {
    slug: 'volunteer-program-success',
    title: 'Volunteer Program Success',
    date: '2024-03-10',
    image: media.supplies,
    imageAlt: 'Volunteers handing out supplies to children',
    excerpt:
      'Our volunteers give their time to mentor, teach and spend time with the children in our care.',
    intro:
      'Our volunteers give their time to support the children in our care. The program includes:',
    items: [
      'Mentoring and tutoring',
      'Skill development workshops',
      'Recreational activities',
      'Community outreach programs',
    ],
    outro:
      'Our volunteers have made a significant impact on the lives of our children, providing them with guidance, support, and valuable life skills. We are grateful for their dedication and commitment.',
  },
  {
    slug: 'medical-camp-for-children',
    title: 'Medical Camp for Children',
    date: '2024-03-05',
    image: media.outreach,
    imageAlt: 'Children smiling with hygiene supplies',
    excerpt:
      'A successful medical camp was organized for all children in our care, providing comprehensive health check-ups.',
    intro:
      'A successful medical camp was organized for all children in our care, providing comprehensive health check-ups. The camp included:',
    items: [
      'General health check-ups',
      'Dental examinations',
      'Eye tests',
      'Nutritional counseling',
      'Vaccination updates',
    ],
    outro:
      'The medical camp was made possible through the support of local healthcare professionals and organizations. We are committed to ensuring the well-being of all children in our care.',
  },
  {
    slug: 'annual-donation-drive-results',
    title: 'Annual Donation Drive Results',
    date: '2024-03-01',
    image: media.group,
    imageAlt: 'A group of children outside',
    excerpt:
      "Our annual donation drive brought in support for the foundation's programs.",
    intro:
      "Our annual donation drive brought in support for the foundation's programs. The funds will be used for:",
    items: [
      'Education programs',
      'Healthcare services',
      'Facility improvements',
      'Nutrition programs',
      'Staff training',
    ],
    outro:
      'We extend our heartfelt gratitude to all our donors and supporters who have made this possible. Your generosity will help us continue our mission of providing a better future for our children.',
  },
]
