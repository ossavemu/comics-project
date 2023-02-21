import { SearchResults } from '@/types'
import algoliasearch from 'algoliasearch/lite'

// Retrieve environment variables or fallback to an empty string
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID ?? ''
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY ?? ''

// Create a new Algolia search client with the app ID and API key
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)

// Initialize the "comics" index in Algolia
const index = client.initIndex('comics')

// Cache search results
const CACHE = new Map<string, { results: SearchResults[] }>()

/**
 * Asynchronous function for searching comics in the "comics" index
 * @param query Search query string
 * @returns Promise containing an object with the search results
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const search = async ({ query }: any): Promise<any> => {

  // Check if the search query exists in the cache and return the results if it does
  if (CACHE.has(query)) return { results: CACHE.get(query) }

  // If the search query is not in the cache, perform a new search in the "comics" index
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  })

  // Store the search results in the cache for future use
  CACHE.set(query, hits as unknown as { results: SearchResults[] })

  // Return the search results
  return { results: hits }
}





