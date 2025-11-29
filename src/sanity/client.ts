import { createClient } from 'next-sanity'

const isProd = process.env.NODE_ENV === 'production'

export const client = createClient({
  projectId: '1182fhj6',
  dataset: 'production',
  apiVersion: '2025-08-05',
  useCdn: isProd,
})
