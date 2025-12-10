import { client } from '@/sanity/client'
import { REVALIDATE_HOURLY, MAIN_CONTAINER_CLASSES } from '@/app/utils'
import { Category, Post } from '@/app/types'
import PostsList from '@/components/PostsList'

const CATEGORY_QUERY = `*[_type == 'category' && slug.current == $slug][0]`
const POSTS_QUERY = `*[_type == 'post' && hidden != true && category._ref in *[_type == 'category' && slug.current == $slug]._id]{...,author->,category->} | order(publishedAt desc)`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const category: Category = await client.fetch(CATEGORY_QUERY, await params, options)
  const posts = await client.fetch<Post[]>(POSTS_QUERY, await params, options)

  return (
    <main className={MAIN_CONTAINER_CLASSES}>
      <h1 className="text-dark-blue text-center font-sans text-2xl font-medium tracking-wide uppercase">
        {category?.title}
      </h1>
      <p className="mt-2 mb-6 text-center text-sm italic">{category.description}</p>
      {posts.length === 0 && <p>No posts found in this category.</p>}
      <PostsList posts={posts} omitCategory />
    </main>
  )
}
