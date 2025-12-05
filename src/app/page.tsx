import { client } from '@/sanity/client'
import { MAIN_CONTAINER_CLASSES, REVALIDATE_HOURLY } from '@/app/utils'
import PostCard from '@/components/PostCard'
import { Post } from '@/app/types'

//still missing some specific validations: e.g. hidden - TBD
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...4]{_id, title, slug, publishedAt}`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

export default async function HomePage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options)

  return (
    <div className={MAIN_CONTAINER_CLASSES}>
      <div className="mt-6 flex flex-col gap-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
