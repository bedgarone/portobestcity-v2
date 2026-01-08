'use client'

import { useState, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

export function SearchBar({ placeholder = 'Search', onNavigate }: { placeholder?: string; onNavigate?: () => void }) {
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
    onNavigate?.()
    router.push(`/search?${params.toString()}`)
  }

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeSearch()
    }
  }

  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        onKeyDown={handleEnterKey}
        className="text-blue w-full bg-white py-2 pr-10 pl-4"
      />
      <button
        aria-label="Search"
        onClick={executeSearch}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-900"
      >
        <SearchIcon className="text-blue size-5" />
      </button>
    </div>
  )
}
