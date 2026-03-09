import { client } from '@/sanity/client'
import { MAIN_CONTAINER_CLASSES, metadataDefaults, REVALIDATE_HOURLY } from '@/app/utils'
import { Post } from '@/app/types'
import PostsList from '@/components/PostsList'
import type { Metadata } from 'next'
import { WelcomeText } from '@/components/WelcomeSentence'
import SidebarPostsList from '@/components/Sidebar/SidebarPostsList'

const POSTS_QUERY = `*[_type == 'post' && defined(slug.current) && hidden != true]{...,author->,category->} | order(publishedAt desc)[0..20]`
const ORIGINAL_POSTS_QUERY = `*[_type == 'post' && defined(slug.current) && hidden != true && original == true]{...,author->,category->} | order(publishedAt desc)[0..3]`
const AWARDS_POSTS_QUERY = `*[_type == "post" && hidden != true && "portoawards" in keywords[]->name]{...,category->,mainImage {..., asset->{_id, metadata {dimensions}}},"keywords": coalesce(keywords[]-> , [])} | order(publishedAt desc)[0..3]`

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
  const originalPosts = await client.fetch<Post[]>(ORIGINAL_POSTS_QUERY, {}, options)
  const awardsPosts = await client.fetch<Post[]>(AWARDS_POSTS_QUERY, {}, options)

  return (
    <div className={MAIN_CONTAINER_CLASSES}>
      <div className="grid grid-cols-1 gap-16 py-10 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <PostsList posts={posts} pageSize={8} />
        </div>
        <div className="col-span-1 hidden flex-col gap-8 lg:flex">
          <WelcomeText className="text-blue bg-surface-blue px-6 py-4" />
          {/* <section className="flex flex-col gap-3">
            <div className="text-blue font-sans text-xl font-medium tracking-wide uppercase">Let us show you magic!</div>
          </section> */}
          <section className="flex flex-col gap-3">
            <div className="text-blue font-sans text-xl font-medium tracking-wide uppercase">Latest Originals</div>
            <SidebarPostsList posts={originalPosts} />
          </section>
          <section className="flex flex-col gap-3">
            <div className="text-blue font-sans text-xl font-medium tracking-wide uppercase">City Awards</div>
            <SidebarPostsList posts={awardsPosts} />
          </section>
        </div>
      </div>
    </div>
  )
}
