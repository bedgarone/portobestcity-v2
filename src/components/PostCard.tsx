import { Post } from '@/app/types'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/app/utils'
import DateStamp from '@/components/DateStamp'
import { useBreakpoint } from '@/app/hooks/useBreakpoint'

const PostCard: React.FC<{ post: Post; omitCategory: boolean; compact: boolean }> = ({
  post,
  omitCategory,
  compact,
}) => {
  const postImageUrl = urlFor(post.mainImage)?.url()
  const mobile = !useBreakpoint('md')

  return (
    <Link href={`/post/${post.slug.current}`}>
      {(post.original || !mobile) && !compact ? (
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
              {post.category?.title && !omitCategory && (
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
            <h2 className="text-dark-grey group-hover:text-dark-blue line-clamp-2 text-xl leading-tight font-medium transition-colors">
              {post.title}
            </h2>
            <DateStamp dateString={post.publishedAt} />
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

          <div className="flex flex-col gap-2">
            {post.category?.title && !omitCategory && (
              <span className="text-dark-blue inline-block font-sans text-xs font-medium uppercase">
                {post.category.title}
              </span>
            )}

            <h2 className="text-dark-grey group-hover:text-dark-blue line-clamp-3 text-lg leading-tight font-medium transition-colors">
              {post.title}
            </h2>

            <div className="flex space-x-2.5">
              {omitCategory && <DateStamp dateString={post.publishedAt} />}

              {compact && post.original && (
                <span className="bg-dark-blue inline-block max-w-20 px-2 py-0.5 text-center font-sans text-[10px] font-semibold text-white uppercase">
                  Original
                </span>
              )}
            </div>
          </div>
        </article>
      )}
    </Link>
  )
}

export default PostCard
