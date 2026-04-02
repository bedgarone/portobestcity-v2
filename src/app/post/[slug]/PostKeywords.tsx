import { Keyword } from '@/app/types'
import Link from 'next/link'

export function PostKeywords({ keywords }: { keywords: Keyword[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
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
  )
}
