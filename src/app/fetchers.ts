import { client } from '@/sanity/client'
import { REVALIDATE_HOURLY } from '@/app/utils'
import { Post, Category } from '@/app/types'

const revalidateOptions = { next: { revalidate: REVALIDATE_HOURLY } }

// QUERIES /////////////////////////////////////
////////////////////////////////////////////////

const BASE_POST = '_type == "post" && defined(slug.current) && hidden != true'
const POST_CARD_PROJECTION = '{..., author->, category->}'
const POST_FULL_PROJECTION =
  '{..., author->, category->, mainImage {..., asset->{_id, metadata {dimensions}}}, "keywords": coalesce(keywords[]-> , [])}'
const DATE_DESCENDING = 'order(publishedAt desc)'
const NOT_CURRENT_SLUG = 'slug.current != $currentSlug'

//home page
const HOME_POSTS_QUERY = `*[${BASE_POST}]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}[0..20]`
const ORIGINAL_POSTS_QUERY = `*[${BASE_POST} && original == true]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}[0..3]`
const AWARDS_POSTS_QUERY = `*[${BASE_POST} && "portoawards" in keywords[]->name]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}[0..3]`

//category page
const CATEGORY_QUERY = `*[_type == 'category' && slug.current == $slug][0]`
const CATEGORY_POSTS_QUERY = `*[${BASE_POST} && category._ref in *[_type == 'category' && slug.current == $slug]._id]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}`

//keyword page
const KEYWORD_QUERY = `*[${BASE_POST} && $slug in keywords[]->name]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}`

//post page
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]${POST_FULL_PROJECTION}`
const RELATED_POSTS_QUERY = `*[${BASE_POST} && count((keywords[]->_id)[@ in $keywordIds]) > 0 && ${NOT_CURRENT_SLUG}]{
  ...,
  author->,
  category->,
  "matchCount": count((keywords[]->_id)[@ in $keywordIds])
} | order(matchCount desc, publishedAt desc)[0..2]
`
const LATEST_FROM_CATEGORY_QUERY = `*[${BASE_POST} && category._ref in *[_type == 'category' && slug.current == $categorySlug]._id && ${NOT_CURRENT_SLUG}]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}[0..3]`

//search page
const SEARCH_QUERY = `*[${BASE_POST} && (title match $searchQuery || pt::text(body) match $searchQuery)]${POST_CARD_PROJECTION} | ${DATE_DESCENDING}`

// FETCHERS ////////////////////////////////////
////////////////////////////////////////////////

export async function fetchHomePosts() {
  const posts = await client.fetch<Post[]>(HOME_POSTS_QUERY, {}, revalidateOptions)
  return posts
}

export async function fetchOriginalPosts() {
  const posts = await client.fetch<Post[]>(ORIGINAL_POSTS_QUERY, {}, revalidateOptions)
  return posts
}

export async function fetchAwardsPosts() {
  const posts = await client.fetch<Post[]>(AWARDS_POSTS_QUERY, {}, revalidateOptions)
  return posts
}

export async function fetchCategory(slug: string) {
  const category = await client.fetch<Category>(CATEGORY_QUERY, { slug }, revalidateOptions)
  return category
}

export async function fetchPostsByCategory(slug: string) {
  const posts = await client.fetch<Post[]>(CATEGORY_POSTS_QUERY, { slug }, revalidateOptions)
  return posts
}

export async function fetchPostsByKeyword(slug: string) {
  const posts = await client.fetch<Post[]>(KEYWORD_QUERY, { slug }, revalidateOptions)
  return posts
}

export async function fetchPost(slug: string) {
  const post = await client.fetch<Post>(POST_QUERY, { slug }, revalidateOptions)
  return post
}

export async function fetchRelatedPosts(currentSlug: string, keywordIds: string[]) {
  const posts = await client.fetch<Post[]>(RELATED_POSTS_QUERY, { currentSlug, keywordIds }, revalidateOptions)
  return posts
}

export async function fetchLatestCategoryPosts(currentSlug: string, categorySlug: string) {
  const posts = await client.fetch<Post[]>(LATEST_FROM_CATEGORY_QUERY, { currentSlug, categorySlug }, revalidateOptions)
  return posts
}

export async function fetchSearchResults(searchQuery: string) {
  const results = await client.fetch<Post[]>(SEARCH_QUERY, { searchQuery }, revalidateOptions)
  return results
}
