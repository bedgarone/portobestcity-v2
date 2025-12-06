import { client } from '@/sanity/client'
import { MAIN_CONTAINER_CLASSES, REVALIDATE_HOURLY } from '@/app/utils'
import { Post } from '@/app/types'
import PostsList from '@/components/PostsList'

const POSTS_QUERY = `*[_type == 'post' && defined(slug.current) && hidden != true]{...,author->,category->} | order(publishedAt desc)[0..20]`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export default async function HomePage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options)

  return (
    <div className={MAIN_CONTAINER_CLASSES}>
      <PostsList posts={posts} />
    </div>
  )
}
