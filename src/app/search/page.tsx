import { client } from '@/sanity/client'
import { Post } from '@/app/types'
import { SearchBar } from '@/components/SearchBar'
import PostsList from '@/components/PostsList'
import { Suspense } from 'react'
import { MAIN_CONTAINER_CLASSES } from '@/app/utils'

const SEARCH_QUERY = `*[_type == "post" && (title match $searchQuery || pt::text(body) match $searchQuery)]{...,author->,category->} | order(publishedAt desc)`

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q || ''

  let posts: Post[] = []

  if (query) {
    const params = { searchQuery: `${query}*` }
    posts = (await client.fetch(SEARCH_QUERY, params)) as Post[]
  }

  return (
    <main className={MAIN_CONTAINER_CLASSES}>
      <header className="flex flex-col gap-4">
        <h1 className="text-dark-blue text-center font-sans text-2xl font-medium tracking-wide uppercase">Search</h1>
        <Suspense>
          <SearchBar border />
        </Suspense>
      </header>

      <section className="mt-4 font-sans">
        {query ? (
          <div>
            <h2 className="text-dark-blue mb-6">{`Results for "${query}":`}</h2>
            {posts.length > 0 ? <PostsList posts={posts} /> : <p>No results found.</p>}
          </div>
        ) : (
          <p>Enter a keyword or phrase.</p>
        )}
      </section>
    </main>
  )
}
