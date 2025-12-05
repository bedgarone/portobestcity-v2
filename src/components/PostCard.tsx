import { Post } from '@/app/types'
import Link from 'next/link'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link
      href={`/posts/${post.slug.current}`}
      className="group flex flex-col gap-4 rounded-lg border p-4 transition-all hover:bg-gray-50"
    >
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{new Date(post.publishedAt).toDateString()}</p>
    </Link>
  )
}

export default PostCard
