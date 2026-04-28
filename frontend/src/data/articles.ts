export interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
}

export const articles: Article[] = [
  {
    id: 'a1',
    title: 'How to save money on mobile recharge',
    excerpt: 'Compare plans, use Wi‑Fi where safe, and avoid auto-renew traps. Practical tips for families on a tight budget.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80',
    category: 'Savings',
  },
  {
    id: 'a2',
    title: 'Cheapest telecom plans in India',
    excerpt: 'A simple breakdown of value packs across Jio, Airtel, Vi, and BSNL—what you actually get per rupee.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    category: 'Compare',
  },
  {
    id: 'a3',
    title: 'Best recharge for students',
    excerpt: 'Low-cost packs, validity tricks, and how to stretch 1 GB when you only need classes and messages.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    category: 'Students',
  },
  {
    id: 'a4',
    title: 'How to avoid fraud recharge apps',
    excerpt: 'Red flags, fake cashback offers, and why you should pay only through official apps or trusted UPI.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
    category: 'Safety',
  },
]
