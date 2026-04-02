import { PortableText } from 'next-sanity'
import { urlFor, MAIN_CONTAINER_CLASSES } from '@/app/utils'
import { Post } from '@/app/types'
import { ImageStandalone } from '@/components/ImageStandalone'
import { YouTubeEmbed } from '@/components/YoutubeEmbed'
import { ImageGallery } from '@/components/ImageGallery'
import PostsList from '@/components/PostsList'
import type { Metadata } from 'next'
import { fetchPost, fetchRelatedPosts, fetchLatestCategoryPosts } from '@/app/fetchers'
import { notFound } from 'next/navigation'
import { PostHeader } from '@/app/post/[slug]/PostHeader'
import { PostKeywords } from './PostKeywords'
import { PostSidebar } from './PostSidebar'

type PageProps = {
  params: Promise<{ slug: string }>
}

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
  const post: Post = await fetchPost((await params).slug)

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

export default async function PostPage({ params }: PageProps) {
  const postSlug = (await params).slug
  const post: Post = await fetchPost(postSlug)
  let latestCategoryPosts: Post[] = []
  if (!post) return notFound()
  const relatedPosts = await fetchRelatedPosts(
    postSlug,
    post.keywords.map((k) => k._id),
  )
  if (!relatedPosts.length) {
    latestCategoryPosts = await fetchLatestCategoryPosts(postSlug, post.category.slug.current)
  }
  return (
    <main className="text-dark-grey">
      <div className={MAIN_CONTAINER_CLASSES}>
        {post.original && <PostHeader post={post} />}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            {!post.original && <PostHeader post={post} />}
            <div className="prose prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-xl prose-p:text-base max-w-none space-y-4">
              {Array.isArray(post.body) && <PortableText value={post.body} components={portableTextComponents} />}
            </div>
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
            {/* MOBILE ONLY - inside post area */}
            {post.keywords.length > 0 && (
              <div className="my-4 lg:hidden">
                <PostKeywords keywords={post.keywords} />
              </div>
            )}
          </div>
          {/* DESKTOP ONLY - sidebar */}
          <div className="col-span-1 hidden lg:block">
            <PostSidebar
              post={post}
              keywords={post.keywords}
              relatedPosts={relatedPosts}
              latestCategoryPosts={latestCategoryPosts}
            />
          </div>
        </div>
      </div>

      {/* MOBILE ONLY - full width */}
      {relatedPosts.length > 0 && (
        <div className="bg-surface-blue mb-4 px-2 py-4 lg:hidden">
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
