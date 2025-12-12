import { PortableText } from 'next-sanity'
import { client } from '@/sanity/client'
import { REVALIDATE_HOURLY, urlFor, MAIN_CONTAINER_CLASSES, DETAULT_IMAGE_SIZES } from '@/app/utils'
import { Post } from '@/app/types'
import { ImageStandalone } from '@/components/ImageStandalone'
import DateStamp from '@/components/DateStamp'
import { UserRoundPen } from 'lucide-react'
import Image from 'next/image'
import { YouTubeEmbed } from '@/components/YoutubeEmbed'
import { ImageGallery } from '@/components/ImageGallery'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{..., author->, category->, mainImage {..., asset->{_id, metadata {dimensions}}}}`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="mt-10 mb-6 text-3xl font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="mt-8 mb-4 text-2xl font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mt-6 mb-3 text-xl font-bold">{children}</h3>,
    h4: ({ children }: any) => <h4 className="mt-4 mb-2 text-lg font-semibold">{children}</h4>,
    normal: ({ children }: any) => <p className="leading-7">{children}</p>,
  },
  types: {
    image: ImageStandalone,
    imageGallery: ImageGallery,
    youtubeEmbed: YouTubeEmbed,
  },
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post: Post = await client.fetch<Post>(POST_QUERY, await params, options)
  const postImageUrl = urlFor(post.mainImage)?.url()
  console.log(post)
  return (
    <main className={MAIN_CONTAINER_CLASSES + ' text-dark-grey'}>
      <div className="mb-6">
        <div className="text-dark-blue font-sans font-medium uppercase">{post.category.title}</div>
        <h1 className="mb-2 text-3xl font-semibold">{post.title}</h1>
        <div className="flex gap-4">
          <DateStamp dateString={post.publishedAt} />
          <div className="text-medium-grey flex items-center gap-1">
            <UserRoundPen className="size-2.5" />
            <div className="font-sans text-xs font-medium uppercase">{post.author.name}</div>
          </div>
        </div>
      </div>
      <div className="text-medium-grey bg-surface-blue mb-4 px-2 py-1 italic">{post.subtitle}</div>
      {postImageUrl && (
        <div className="mb-4">
          <Image
            src={postImageUrl}
            alt={'Main image of ' + post.title}
            width={post.mainImage.asset.metadata.dimensions.width}
            height={post.mainImage.asset.metadata.dimensions.height}
            quality={75}
            sizes={DETAULT_IMAGE_SIZES}
            className="h-auto w-full"
            priority
          />
          {post.imageSource && <p className="text-credit-grey mt-1 text-right font-sans text-xs">{post.imageSource}</p>}
        </div>
      )}
      <div className="prose prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-xl prose-p:text-base max-w-none space-y-4">
        {Array.isArray(post.body) && <PortableText value={post.body} components={portableTextComponents} />}
      </div>
    </main>
  )
}
