import { client } from '@/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'

export const REVALIDATE_HOURLY = 3600
export const MAIN_CONTAINER_CLASSES = 'container mx-auto max-w-6xl px-4 md:px-10'

export const navigationPages = [
  { title: 'Tourism', link: '/category/tourism' },
  { title: 'Culture', link: '/category/culture' },
  { title: 'Sports', link: '/category/sports' },
  // { title: 'Culture', link: '/visiting' },
]

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null

export { urlFor }
