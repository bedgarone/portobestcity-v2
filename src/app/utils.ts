import { client } from '@/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'
import { metadata } from './layout'

export const REVALIDATE_HOURLY = 3600
export const MAIN_CONTAINER_CLASSES = 'container mx-auto max-w-2xl px-4 md:px-10' //max-w-6xl for larger screens later version
export const DETAULT_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px'

export const navigationPages = [
  { title: 'Tourism', link: '/category/tourism' },
  { title: 'Culture', link: '/category/culture' },
  { title: 'Sports', link: '/category/sports' },
  { title: 'Protagonists', link: '/category/protagonists' },
  // { title: 'Visiting', link: '/visiting' },
]

export const metadataDefaults = {
  title: 'PortoBestCity - Porto News, Culture & Guides in English',
  description:
    'The latest news and guides. Uncovering the stories, people and culture that make Porto exceptional, all in English.',
}

export const aboutPages = [
  { title: 'Editorial', link: '/editorial' },
  { title: 'Technical File', link: '/technical' },
]

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null

const dateFormat = (publishedAt: string) => {
  const d = new Date(publishedAt)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day} ${month}, ${year}`
}

export { urlFor, dateFormat }
