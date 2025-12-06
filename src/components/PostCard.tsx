import { Post } from '@/app/types'
import Link from 'next/link'
import Image from 'next/image'
import { dateFormat, urlFor } from '@/app/utils'
import { Clock4 } from 'lucide-react'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const postImageUrl = urlFor(post.mainImage)?.url()
  console.log(post.category)
  return (
    <Link href={`/post/${post.slug.current}`}>
      {post.original ? (
        <article className="group mb-5 cursor-pointer">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {postImageUrl && (
              <Image
                src={postImageUrl}
                alt={post.title}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-102"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {post.category?.title && (
                <span className="bg-surface-blue text-dark-blue inline-block px-2 py-1 text-center font-sans text-xs font-semibold uppercase shadow-sm">
                  {post.category.title}
                </span>
              )}

              {post.original && (
                <span className="bg-dark-blue inline-block px-2 py-1 text-center font-sans text-xs font-semibold text-white uppercase shadow-sm">
                  Original
                </span>
              )}
            </div>
          </div>

          <div className="my-3 space-y-2">
            <h2 className="text-dark-grey group-hover:text-dark-blue text-xl font-medium transition-colors">
              {post.title}
            </h2>
            <div className="text-medium-grey flex items-center gap-1">
              <Clock4 className="size-3" />
              <div className="font-sans text-sm font-medium">{dateFormat(post.publishedAt)}</div>
            </div>
            <p className="text-medium-grey line-clamp-2 font-sans text-sm">{post.subtitle}</p>
          </div>
        </article>
      ) : (
        <article className="group mb-5 flex cursor-pointer items-center gap-4">
          {postImageUrl && (
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden">
              <Image
                src={postImageUrl}
                alt={post.title}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-102"
                sizes="96px"
              />
            </div>
          )}

          <div className="flex flex-col">
            <div>
              {post.category?.title && (
                <span className="text-dark-blue inline-block font-sans text-xs font-medium uppercase">
                  {post.category.title}
                </span>
              )}
            </div>

            <h2 className="text-dark-grey group-hover:text-dark-blue line-clamp-3 text-lg font-medium transition-colors">
              {post.title}
            </h2>
          </div>
        </article>
      )}
    </Link>
  )
}

export default PostCard
