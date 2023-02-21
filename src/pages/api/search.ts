import { search } from '@/services/search'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<any>): Promise<void> {
  const { query: { q } } = req
  if (typeof q !== 'string') {
    res.status(400).json({ error: 'Bad Request' })
    return
  }
  const { results } = await search({ query: q })

  res.status(200).json(results)
}
