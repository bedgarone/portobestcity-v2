import { MAIN_CONTAINER_CLASSES, metadataDefaults } from '@/app/utils'
import PostsList from '@/components/PostsList'
import type { Metadata } from 'next'
import { WelcomeText } from '@/components/WelcomeSentence'
import SidebarPostsList from '@/components/Sidebar/SidebarPostsList'
import { fetchAwardsPosts, fetchHomePosts, fetchOriginalPosts } from '@/app/fetchers'

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
  const posts = await fetchHomePosts()
  const originalPosts = await fetchOriginalPosts()
  const awardsPosts = await fetchAwardsPosts()

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
