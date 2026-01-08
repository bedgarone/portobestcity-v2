import { client } from '@/sanity/client'
import { REVALIDATE_HOURLY, MAIN_CONTAINER_CLASSES } from '@/app/utils'
import { Post } from '@/app/types'
import PostsList from '@/components/PostsList'

//query for posts that have a keyword matching the slug
const POSTS_QUERY = `*[_type == 'post' && hidden != true && $slug in keywords[]->name]{...,author->,category->} | order(publishedAt desc)`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, await params, options)

  return (
    <main className={MAIN_CONTAINER_CLASSES}>
      <p className="mb-2 text-center text-sm italic">{`Listing posts tagged with keyword:`}</p>
      <h1 className="text-blue mb-6 text-center font-sans text-xl font-medium tracking-wider uppercase">
        {`#${(await params).slug}`}
      </h1>
      {posts.length === 0 && <p>No posts found.</p>}
      <PostsList posts={posts} omitCategory />
    </main>
  )
}
