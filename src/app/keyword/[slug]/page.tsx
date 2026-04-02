import { MAIN_CONTAINER_CLASSES } from '@/app/utils'
import PostsList from '@/components/PostsList'
import { fetchPostsByKeyword } from '@/app/fetchers'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const keyword = (await params).slug
  const posts = await fetchPostsByKeyword(keyword)

  return (
    <main className={MAIN_CONTAINER_CLASSES}>
      <p className="mb-2 text-center text-sm italic">{`Listing posts tagged with keyword:`}</p>
      <h1 className="text-blue mb-6 text-center font-sans text-xl font-medium tracking-wider uppercase">
        {`#${keyword}`}
      </h1>
      {posts.length === 0 && <p>No posts found.</p>}
      <PostsList posts={posts} omitCategory pageSize={6} />
    </main>
  )
}
