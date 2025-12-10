'use client'

import { Post } from '@/app/types'
import { useLoadMore } from '@/app/hooks/useLoadMore'
import PostCard from '@/components/PostCard'

const PostsList: React.FC<{ posts: Post[]; omitCategory?: boolean }> = ({ posts, omitCategory }) => {
  const { visibleItems, hasMore, loadMore } = useLoadMore(posts, 9)

  return (
    <div className="flex flex-col gap-4">
      <div className="divide-light-grey flex flex-col gap-6 divide-y-1">
        {visibleItems.map((post: Post) => (
          <PostCard key={post._id} post={post} omitCategory={omitCategory ?? false} />
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMore} className="bottom-4 rounded">
          Load More
        </button>
      )}
    </div>
  )
}

export default PostsList
