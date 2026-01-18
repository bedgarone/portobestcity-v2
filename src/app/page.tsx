import { client } from '@/sanity/client'
import { MAIN_CONTAINER_CLASSES, metadataDefaults, REVALIDATE_HOURLY } from '@/app/utils'
import { Post } from '@/app/types'
import PostsList from '@/components/PostsList'
import type { Metadata } from 'next'

const POSTS_QUERY = `*[_type == 'post' && defined(slug.current) && hidden != true]{...,author->,category->} | order(publishedAt desc)[0..20]`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export const metadata: Metadata = {
  title: metadataDefaults.title,
  description: metadataDefaults.description,
  openGraph: {
    title: metadataDefaults.title,
    description: metadataDefaults.description,
    url: 'https://portobest.city',
    siteName: 'PortoBestCity',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: metadataDefaults.title,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: metadataDefaults.title,
    description: metadataDefaults.description,
    images: ['/assets/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://portobest.city',
  },
}

export default async function HomePage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options)

  return (
    <div className={MAIN_CONTAINER_CLASSES}>
      <PostsList posts={posts} />
    </div>
  )
}
