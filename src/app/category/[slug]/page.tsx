import { MAIN_CONTAINER_CLASSES } from '@/app/utils'
import PostsList from '@/components/PostsList'
import { fetchCategory, fetchPostsByCategory } from '@/app/fetchers'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const categorySlug = (await params).slug
  const category = await fetchCategory(categorySlug)
  const posts = await fetchPostsByCategory(categorySlug)

  return (
    <main className={MAIN_CONTAINER_CLASSES}>
      <h1 className="text-dark-blue text-center font-sans text-2xl font-medium tracking-wide uppercase">
        {category?.title}
      </h1>
      <p className="mt-2 mb-6 text-center text-sm italic">{category.description}</p>
      {posts.length === 0 && <p>No posts found in this category.</p>}
      <PostsList posts={posts} omitCategory pageSize={6} />
    </main>
  )
}
