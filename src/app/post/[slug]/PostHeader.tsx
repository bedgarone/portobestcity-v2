import { LARGE_IMAGE_SIZES, urlFor } from '@/app/utils'
import { Post } from '@/app/types'
import DateStamp from '@/components/DateStamp'
import { UserRoundPen, Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function PostHeader({ post }: { post: Post }) {
  const postImageUrl = urlFor(post.mainImage)?.url()
  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-3">
          <Link href={`/category/${post.category.slug.current}`}>
            <div className="text-dark-blue hover:text-blue font-sans font-medium uppercase transition-colors">
              {post.category.title}
            </div>
          </Link>
          {post.original && (
            <span className="bg-dark-blue inline-block px-2 py-0.5 text-center font-sans font-semibold text-white uppercase">
              Original
            </span>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-semibold">{post.title}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <DateStamp dateString={post.publishedAt} />
          <div className="text-medium-grey flex items-center gap-1">
            <UserRoundPen className="size-2.5" />
            <div className="font-sans text-xs font-medium uppercase">{post.author.name}</div>
          </div>
          {!post.original && post.source.sourceName && (
            <div className="text-medium-grey flex items-center gap-1">
              <Newspaper className="size-2.5" />
              <div className="text-credit-grey hover:text-medium-grey font-sans text-xs font-medium uppercase transition-colors">
                <a href={post.source.sourceURL} target="_blank">
                  {post.source.sourceName}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {post.subtitle && <div className="text-medium-grey bg-surface-blue mb-4 px-2 py-1 italic">{post.subtitle}</div>}
      {postImageUrl && (
        <div className="mb-4">
          <Image
            src={postImageUrl}
            alt={'Main image of ' + post.title}
            width={post.mainImage.asset.metadata.dimensions.width}
            height={post.mainImage.asset.metadata.dimensions.height}
            quality={90}
            sizes={LARGE_IMAGE_SIZES}
            className="h-auto w-full"
            priority
          />
          {post.imageSource && <p className="text-credit-grey mt-1 text-right font-sans text-xs">{post.imageSource}</p>}
        </div>
      )}
    </div>
  )
}
