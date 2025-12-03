import Link from 'next/link'
import Image from 'next/image'

import { client } from '@/sanity/client'
import { REVALIDATE_HOURLY } from '@/app/utils'
import PostCard from '@/app/components/PostCard'
import { Post } from '@/app/types'
import { SearchBar } from '@/app/components/SearchBar'
import { Suspense } from 'react'

//still missing some specific validations: e.g. hidden - TBD
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...4]{_id, title, slug, publishedAt}`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export default async function HomePage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options)

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <div className="flex gap-x-4">
        <Link href="/category/tourism" className="underline">
          Tourism
        </Link>
        <Link href="/category/culture" className="underline">
          Culture
        </Link>
        <Link href="/category/sports" className="underline">
          Sports
        </Link>
        <Link href="/visiting" className="underline">
          Visiting
        </Link>
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
      UPDATE NEEDED (NEXTJS): AFTER EMAIL RECEIVED ABOUT SECURITY FIX
      <Image src="/assets/TilesRepeatMedium_Soft.png" width={1000} height={500} quality={100} alt="Tiles Background" />
      <img className="logo-test" src="/assets/LogoVF_Web.png" alt="PBC Logo" />
      <h1 className="text-dark-blue mb-8 text-4xl font-bold">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ul>
    </main>
  )
}
