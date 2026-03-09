'use client'

import { Post } from '@/app/types'
import { useLoadMore } from '@/app/hooks/useLoadMore'
import PostCard from '@/components/PostCard'
import { Button } from '@/components/ui/button'

const PostsList: React.FC<{
  posts: Post[]
  pageSize?: number
  omitCategory?: boolean
  compact?: boolean
  noActionButton?: boolean
}> = ({ posts, pageSize = 4, omitCategory, compact, noActionButton }) => {
  const { visibleItems, hasMore, loadMore } = useLoadMore(posts, pageSize)

  return (
    <div className="flex flex-col gap-4">
      <div className="divide-light-grey grid grid-cols-1 gap-8 divide-y-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:divide-none">
        {visibleItems.map((post: Post) => (
          <PostCard key={post._id} post={post} omitCategory={omitCategory ?? false} compact={compact ?? false} />
        ))}
      </div>
      {hasMore && !noActionButton && (
        <Button onClick={loadMore} variant="default" className="mx-auto my-2">
          Load More
        </Button>
      )}
    </div>
  )
}

export default PostsList
