import { SearchBar } from '@/components/SearchBar'
import PostsList from '@/components/PostsList'
import { Suspense } from 'react'
import { MAIN_CONTAINER_CLASSES } from '@/app/utils'
import { fetchSearchResults } from '@/app/fetchers'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q || ''

  const posts = query ? await fetchSearchResults(`${query}*`) : []

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
            {posts.length > 0 ? <PostsList posts={posts} pageSize={6} /> : <p>No results found.</p>}
          </div>
        ) : (
          <p>Enter a keyword or phrase.</p>
        )}
      </section>
    </main>
  )
}
