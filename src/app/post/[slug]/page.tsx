import { PortableText } from 'next-sanity'
import { client } from '@/sanity/client'
import { REVALIDATE_HOURLY, urlFor, MAIN_CONTAINER_CLASSES, DEFAULT_IMAGE_SIZES } from '@/app/utils'
import { PageProps, Post } from '@/app/types'
import { ImageStandalone } from '@/components/ImageStandalone'
import DateStamp from '@/components/DateStamp'
import { UserRoundPen, Newspaper } from 'lucide-react'
import Image from 'next/image'
import { YouTubeEmbed } from '@/components/YoutubeEmbed'
import { ImageGallery } from '@/components/ImageGallery'
import Link from 'next/link'
import PostsList from '@/components/PostsList'
import type { Metadata } from 'next'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{..., author->, category->, mainImage {..., asset->{_id, metadata {dimensions}}}, "keywords": coalesce(keywords[]-> , [])}`
const RELATED_POSTS_QUERY = `*[_type == 'post' && hidden != true && count((keywords[]->_id)[@ in $keywordIds]) > 0 && slug.current != $currentSlug]{
  ...,
  author->,
  category->,
  "matchCount": count((keywords[]->_id)[@ in $keywordIds])
} | order(matchCount desc, publishedAt desc)[0..2]
`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="mt-10 mb-6 text-3xl font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="mt-8 mb-4 text-2xl font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mt-6 mb-3 text-xl font-bold">{children}</h3>,
    h4: ({ children }: any) => <h4 className="mt-4 mb-2 text-lg font-semibold">{children}</h4>,
    normal: ({ children }: any) => <p className="leading-7">{children}</p>,
    interviewQuestion: ({ children }: any) => (
      <p className="text-dark-blue my-8 pl-5 text-end font-sans text-sm">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a href={value.href} target={target} rel={rel} className="text-blue hover:text-dark-blue transition-colors">
          {children}
        </a>
      )
    },
  },
  types: {
    image: ImageStandalone,
    imageGallery: ImageGallery,
    youtubeEmbed: YouTubeEmbed,
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post: Post = await client.fetch<Post>(POST_QUERY, await params, options)

  if (!post) return {}

  const siteUrl = 'https://portobest.city'
  const postImageUrl = urlFor(post.mainImage)?.width(1200).quality(85).url() || '/assets/og_image.jpg'
  const description = post.subtitle || 'Click to read the full article on PortoBestCity.'

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `${siteUrl}/post/${post.slug.current}`,
      siteName: 'PortoBestCity',
      images: [
        {
          url: postImageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
      locale: 'en_GB',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [postImageUrl],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post: Post = await client.fetch<Post>(POST_QUERY, await params, options)
  const postImageUrl = urlFor(post.mainImage)?.url()
  const relatedPosts: Post[] = await client.fetch<Post[]>(
    RELATED_POSTS_QUERY,
    { keywordIds: post.keywords.map((k) => k._id), currentSlug: post.slug.current },
    options,
  )
  return (
    <main className="text-dark-grey">
      <div className={MAIN_CONTAINER_CLASSES}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6">
              <Link href={`/category/${post.category.slug.current}`}>
                <div className="text-dark-blue hover:text-blue font-sans font-medium uppercase transition-colors">
                  {post.category.title}
                </div>
              </Link>
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
            {post.subtitle && (
              <div className="text-medium-grey bg-surface-blue mb-4 px-2 py-1 italic">{post.subtitle}</div>
            )}
            {postImageUrl && (
              <div className="mb-4">
                <Image
                  src={postImageUrl}
                  alt={'Main image of ' + post.title}
                  width={post.mainImage.asset.metadata.dimensions.width}
                  height={post.mainImage.asset.metadata.dimensions.height}
                  quality={75}
                  sizes={DEFAULT_IMAGE_SIZES}
                  className="h-auto w-full"
                  priority
                />
                {post.imageSource && (
                  <p className="text-credit-grey mt-1 text-right font-sans text-xs">{post.imageSource}</p>
                )}
              </div>
            )}
            <div className="prose prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-xl prose-p:text-base max-w-none space-y-4">
              {Array.isArray(post.body) && <PortableText value={post.body} components={portableTextComponents} />}
            </div>
            {/* if not original, put a link with Source: (link) plus explanation about non-original content */}
            <div className="text-credit-grey py-6 text-end font-sans text-xs">
              {post.original ? (
                <p>
                  All rights reserved by PortoBestCity. Any copying, reproduction, editing, or reuse of the photographs
                  and images from this coverage, including on social media or other websites, is strictly prohibited
                  without prior written permission.
                </p>
              ) : (
                <p>
                  Source:{' '}
                  {post.source.sourceName ? (
                    <a
                      href={post.source.sourceURL}
                      target="_blank"
                      className="text-light-blue hover:text-dark-blue font-sans transition-colors"
                    >
                      {post.source.sourceName}
                    </a>
                  ) : (
                    post.source.sourceName
                  )}
                  . Non-original articles are adapted from the mentioned Portuguese sources as part of our mission to
                  bring region information to international readers. If any of this content is copyright-protected and
                  you wish to request its removal or modification, please contact us.
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1">
            {post.keywords.length > 0 && (
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <Link key={keyword._id} href={`/keyword/${keyword.name}`}>
                      <span
                        key={keyword._id}
                        className="bg-light-grey text-blue inline-block px-2 py-1 text-center font-sans text-xs tracking-wider uppercase"
                      >
                        {`#${keyword.name}`}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="bg-surface-blue mb-4 px-2 py-4">
          <div className={MAIN_CONTAINER_CLASSES}>
            <div className="text-blue mb-4 font-sans text-xl font-medium tracking-wide uppercase">Related News</div>
            <div className="grid gap-8">
              <PostsList posts={relatedPosts} omitCategory compact noActionButton pageSize={4} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
