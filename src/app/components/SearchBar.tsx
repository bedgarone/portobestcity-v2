'use client'

import { useState, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchBar({ placeholder = 'Search...' }: { placeholder?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phrase, setPhrase] = useState(searchParams.get('q') || '')

  const executeSearch = () => {
    const params = new URLSearchParams(searchParams)
    const value = phrase.trim()

    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    router.push(`/search?${params.toString()}`)
  }

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeSearch()
    }
  }

  return (
    <div className="relative flex w-full max-w-md items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        onKeyDown={handleEnterKey}
        className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
      <button
        aria-label="Search"
        onClick={executeSearch}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-900"
      >
        🔍
      </button>
    </div>
  )
}
