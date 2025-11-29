import { PortableText } from 'next-sanity'
import { client } from '@/sanity/client'
import Link from 'next/link'
import { REVALIDATE_HOURLY, urlFor } from '@/app/utils'
import { Post } from '@/app/types'
import { ImageStandalone } from '@/app/components/ImageStandalone'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

const options = { next: { revalidate: REVALIDATE_HOURLY } }

const portableTextComponents = {
  types: {
    image: ImageStandalone,
  },
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await client.fetch<Post>(POST_QUERY, await params, options)
  const postImageUrl = urlFor(post.mainImage)?.url()

  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8">
      <Link href="/" className="hover:underline">
        Back to posts
      </Link>
      <img src={postImageUrl} alt={post.title} className="rounded-xl" />
      <h1 className="mb-8 text-4xl font-bold">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} components={portableTextComponents} />}
      </div>
    </main>
  )
}
