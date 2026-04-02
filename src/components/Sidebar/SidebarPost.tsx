import { Post } from '@/app/types'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/app/utils'

const SidebarPost: React.FC<{ post: Post }> = ({ post }) => {
  const postImageUrl = urlFor(post.mainImage)?.url()

  return (
    <Link href={`/post/${post.slug.current}`}>
      <article className="group mb-5 flex cursor-pointer items-center gap-4">
        {postImageUrl && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden">
            <Image
              src={postImageUrl}
              alt={post.title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-102"
              sizes="96px"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-2.5">
            {post.category?.title && (
              <span className="text-dark-blue inline-block font-sans text-xs font-medium uppercase">
                {post.category.title}
              </span>
            )}

            {post.original && (
              <span className="bg-dark-blue inline-block max-w-20 px-2 py-0 text-center font-sans text-[10px] font-semibold text-white uppercase">
                Original
              </span>
            )}
          </div>

          <h2 className="text-dark-grey group-hover:text-dark-blue text-md line-clamp-3 leading-tight font-medium transition-colors">
            <p className="line-clamp-2">{post.title}</p>
          </h2>
        </div>
      </article>
    </Link>
  )
}

export default SidebarPost
