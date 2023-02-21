import Head from 'next/head'
import { Plock, Breakpoint } from 'react-plock'
import Image from 'next/image'
import Link from 'next/link'
import { readFiles } from '@/utils'
import Layout from '@/components/Layout'
import { Comic } from '@/types'
import { useI18n } from '@/context/i18n'

// Configure the breakpoints for the Plock component
const breakpoints: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1024, columns: 3 }
]

export default function Home ({ latestComics }: { latestComics: Comic[] }): JSX.Element {
  const { t } = useI18n()

  return (
    <>
      <Head>
        <title>{t('TITLE')}</title>
        <meta name='description' content='NEXT JS TS-PROJECT - Home' />

      </Head>

      <Layout>

        <main className='mb-8'>
          <h2 className='text-3xl font-bold text-center mb-10'>{t('LATEST_COMICS')}</h2>
          <section className='max-w-xl mx-auto relative'>
            <Plock gap='1rem' breakpoints={breakpoints}>
              {latestComics.map(comic => {
                return (
                  <div key={comic.id} className='m-4'>
                    <Link
                      href={`/comic/${comic.id}`}
                      className='mb-4 pb-4 m-auto'
                    >
                      <h3 className='font-semibold text-md text-center pb-2'>
                        {`${comic.title} #${comic.id}`}
                      </h3>
                      <div>
                        <Image
                          src={comic.img}
                          alt={comic.alt}
                          priority
                          width={+comic.width}
                          height={+comic.height}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                )
              })}
            </Plock>
          </section>
        </main>
      </Layout>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps (): Promise<any> {
  const latestComics = await readFiles('./src/comics')
  return {
    props: {
      latestComics
    }
  }
}
