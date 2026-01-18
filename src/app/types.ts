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

export type PageProps<T extends Record<string, string> = {}> = {
  params: Promise<T>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
