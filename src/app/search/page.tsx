import { client } from '@/sanity/client'
import { Post } from '@/app/types'
import { SearchBar } from '@/app/components/SearchBar'
import PostsList from '@/app/components/PostsList'
import { Suspense } from 'react'

const SEARCH_QUERY = `*[_type == "post" && (title match $searchQuery || pt::text(body) match $searchQuery)] | order(publishedAt desc) {_id, title, slug, publishedAt}`

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q || ''

  let posts: Post[] = []

  if (query) {
    const params = { searchQuery: `${query}*` }
    posts = (await client.fetch(SEARCH_QUERY, params)) as Post[]
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Search News</h1>
        <Suspense>
          <SearchBar />
        </Suspense>
      </header>

      <section>
        {query ? (
          <div>
            <h2 className="mb-6 text-2xl font-semibold">{`Results for "${query}"`}</h2>
            {posts.length > 0 ? <PostsList posts={posts} /> : <p>No results found.</p>}
          </div>
        ) : (
          <p>Enter a keyword or phrase.</p>
        )}
      </section>
    </main>
  )
}
