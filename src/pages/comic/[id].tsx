import Head from 'next/head'
import { Comic } from '@/types'
import Image from 'next/image'
import { readFiles } from '@/utils'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function IdComic (prop: Comic): JSX.Element {
  const { title, img, alt, id, width, height } = prop

  // navigation section
  const Navigation = (): JSX.Element => {
    const prev = prop.prev ?? null
    const next = prop.next ?? null

    return (
      <section className='max-w-2xl text-center grid grid-cols-2 py-6 m-auto'>

        {(prop.isPrev === true && prev !== null) && (
          <Link href={`/comic/${prev.id}`} className='text-left mr-8'>
            <h4 className='font-bold mb-2'>
              {`⬅️ Previous comic: ${prev.title} #${prev.id}`}
            </h4>
          </Link>)}

        {(prop.isNext === true && next !== null) && (
          <Link href={`/comic/${next.id}`} className='text-right'>
            <h4 className='font-bold mb-2'>
              {`Next comic: ${next.title} #${next.id} ➡️`}
            </h4>
          </Link>)}

      </section>
    )
  }

  // comic section
  return (
    <>
      <Head>
        <title>{`Comic #${id}`}</title>
        <meta name='description' content={`${title} #${id}`} />
      </Head>
      <Layout>
        <main className='max-w-lg flex flex-col items-center justify-center mx-auto'>
          <h1 className='font-bold text-2xl pb-2'>{`${title} #${id}`}</h1>
          <Image
            priority
            width={+width}
            height={+height}
            src={img}
            alt={alt}
            style={{
              margin: '0 auto',
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          <p className='m-4 pt-2'>{alt}</p>
          <Navigation />
        </main>
      </Layout>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticPaths (): Promise<any> {
  const validIds = await readFiles('./src/comics', {
    getOnlyPathNames: 'noExtension'
  })
  const validPaths = validIds.map((id: string) => {
    return {
      params: {
        id
      }
    }
  })

  return {
    paths: validPaths,
    fallback: true
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps (context: any): Promise<any> {
  const { id } = context.params
  const content = await readFiles('./src/comics', {
    targetId: id
  })
  const [prev, next] = await readFiles('./src/comics', {
    getOnlyPrevNextById: id
  })
  const [isPrev, isNext] = await readFiles('./src/comics', {
    getOnlyPrevNextById: id,
    onlyBooleanPrevNext: true
  })

  return {
    props: {
      ...content,
      prev,
      next,
      isPrev,
      isNext
    }
  }
}
