import Layout from '@/components/Layout'
import Image from 'next/image'
import { search } from '@/services/search'
import { GetServerSidePropsContext } from 'next'
import tw from '@/styles/custom-tw-styles.json'

import Head from 'next/head'
import Link from 'next/link'
import { useI18n } from '@/context/i18n'

interface QueryProps {
  query: string
  results?: FoundComic[]
}
interface FoundComic {
  id: number
  img: string
  alt: string
  title: string
}

export default function Search ({ query, results }: QueryProps): JSX.Element {
  const { t } = useI18n()

  return (
    <>
      <Head>
        <title>
          {query === '' ? t('DEFAULT_SEARCH_TEXT') : t('TITLE_SEARCH', [query])}
        </title>
        <meta name='description' content={`Results for ${query}`} />
      </Head>
      <Layout>
        <main>
          {query === '' ? (
            <h1 className='text-center pb-4'>Please input any query!</h1>
          ) : (
            <h1 className='text-center pb-4'>
              {t('SEARCH_RESULTS_TITLE', [
                results?.length.toString() || '0',
                query || ''
              ])}
            </h1>
          )}

          <ul>
            {results?.map(result => {
              return (
                <li key={result.id}>
                  <div
                    className={
                      'p-3 max-w-2xl bg-neutral-100 transition hover:bg-slate-200 ' +
                      tw.card
                    }
                  >
                    <Link href={`/comic/${result.id}`}>
                      <div className='flex flex-row justify-between items-stretch gap-3'>
                        <div className='flex flex-col gap-4'>
                          <h3 className='text-lg font-semibold text-center mx-2 mb-2 whitespace-nowrap'>
                            {result.title}
                          </h3>
                          <p className='text-sm text-justify'>{result.alt}</p>
                        </div>
                        <Image
                          src={result.img}
                          priority
                          alt={result.alt}
                          width={200}
                          height={200}
                          className='m-4 transition hover:scale-110 w-auto h-auto'
                        />
                      </div>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </main>
      </Layout>
    </>
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps (
  context: GetServerSidePropsContext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const { query } = context
  const { q = '' } = query
  if (q === '') {
    return { props: { query: q } }
  }
  if (typeof q !== 'string') return
  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}
