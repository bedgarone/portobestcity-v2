import { Post } from '@/app/types'
import SidebarPost from '@/components/Sidebar/SidebarPost'

const SidebarPostsList: React.FC<{
  posts: Post[]
}> = ({ posts }) => {
  return (
    <div className="divide-light-grey grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 divide-y-1">
      {posts.map((post: Post) => (
        <SidebarPost key={post._id} post={post} />
      ))}
    </div>
  )
}

export default SidebarPostsList
