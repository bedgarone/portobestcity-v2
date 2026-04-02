import { Keyword, Post } from '@/app/types'
import { PostKeywords } from './PostKeywords'
import SidebarPostsList from '@/components/Sidebar/SidebarPostsList'
import { SIDEBAR_TITLE_CLASSES } from '@/app/utils'

export function PostSidebar({
  post,
  keywords,
  relatedPosts,
  latestCategoryPosts,
}: {
  post: Post
  keywords: Keyword[]
  relatedPosts: Post[]
  latestCategoryPosts: Post[]
}) {
  return (
    <div className="flex flex-col gap-6">
      {keywords.length > 0 && <PostKeywords keywords={keywords} />}
      {relatedPosts.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className={SIDEBAR_TITLE_CLASSES}>Related Posts</div>
          <SidebarPostsList posts={relatedPosts} />
        </section>
      )}
      {latestCategoryPosts.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className={SIDEBAR_TITLE_CLASSES}>Also in {latestCategoryPosts[0].category.title}</div>
          <SidebarPostsList posts={latestCategoryPosts} />
        </section>
      )}
    </div>
  )
}
