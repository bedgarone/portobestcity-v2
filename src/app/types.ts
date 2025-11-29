import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { SanityDocument } from 'next-sanity'

export interface Post extends SanityDocument {
  title: string
  subtitle: string
  slug: SanitySlug
  author: SanityReference
  //body -> TS not complaining - TBA
  category: SanityReference
  publishedAt: string
  mainImage: {
    _type: string
    asset: SanityReference
  }
  original: boolean
  keywords: SanityReference[]
}

export interface SanityImage extends SanityImageObject {
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
