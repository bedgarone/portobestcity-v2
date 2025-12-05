import { client } from '@/sanity/client'
import Link from 'next/link'
import { REVALIDATE_HOURLY } from '@/app/utils'
import { Post } from '@/app/types'
import PostsList from '@/components/PostsList'

const CATEGORY_QUERY = `*[_type == 'category' && slug.current == $slug][0]{title}`
const POSTS_QUERY = `*[_type == 'post' && hidden != true && category._ref in *[_type == 'category' && slug.current == $slug]._id]{...,author->,category->} | order(publishedAt desc)`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = await client.fetch(CATEGORY_QUERY, await params, options) //missing category type
  const posts = await client.fetch<Post[]>(POSTS_QUERY, await params, options)

  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">Posts in category: {category?.title}</h1>
      {posts.length === 0 && <p>No posts found in this category.</p>}
      <PostsList posts={posts} />
    </main>
  )
}
