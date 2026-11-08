import { SanityImageObjectStub } from '@sanity/asset-utils'
import { PortableTextBlock, SanityDocument } from 'next-sanity'

export interface Post extends SanityDocument {
  title: string
  subtitle: string
  slug: SanitySlug
  author: Author
  body: PortableTextBlock[]
  category: Category
  publishedAt: string
  mainImage: {
    _type: string
    asset: { _id: string; metadata: { dimensions: { width: number; height: number } } }
  }
  imageSource?: string
  original: boolean
  keywords: Keyword[]
  source: { sourceName: string; sourceURL: string }
}

export interface SanityImage extends SanityImageObjectStub {
  caption?: string
}

export interface SanityReference {
  _ref: string
  _type: string
}

export interface SanitySlug {
  _type: string
  current: string
}

export interface Category extends SanityDocument {
  title: string
  slug: SanitySlug
  description?: string
}

export interface Author extends SanityDocument {
  name: string
  slug: SanitySlug
}

export interface Keyword extends SanityDocument {
  name: string
}

export interface SetlistSong {
  _key: string
  title?: string
  note?: string
  divider?: string
}

export interface Setlist {
  artist: string
  venue: string
  city: string
  date: string
  tracks: SetlistSong[]
}

export interface Scorer {
  _key?: string
  player: string
  minute: string
  note?: string
}

export interface Team {
  name: string
  color?: string
  lines: {
    _key: string
    players: Player[]
  }[]
}

export interface FootballMatchProps {
  _key: string
  _type: string
  matchType?: MatchType
  competition?: string
  matchday?: string
  venue?: string
  date?: string
  score: {
    home?: number
    away?: number
  }
  scorers?: {
    home?: Scorer[]
    away?: Scorer[]
  }
  teams: {
    home: Team
    away: Team
  }
}

export interface Player {
  _key: string
  number?: number
  name: string
}

export interface StartingLineupProps {
  lines: Player[][]
  color?: string
  teamName: string
  formation?: string
  direction?: 'up' | 'down'
  matchType?: MatchType
}

export type MatchType = 'football' | 'basket' | 'handball' | 'hockey'

export type PageProps<T extends Record<string, string> = {}> = {
  params: Promise<T>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
