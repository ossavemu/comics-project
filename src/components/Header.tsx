/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises  */
import { SearchResults } from '@/types'
import { Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useI18n } from '@/context/i18n'

export default function Header (): JSX.Element {
  const { t } = useI18n()
  const [home, about, more, search] = t('NAVIGATION').split(',')

  const [results, setResults] = useState<SearchResults[]>([])
  const [scroll, setScroll] = useState(0)
  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const setQuery = (): string => searchRef.current?.value ?? ''

  const navbarPlaces = [
    { name: home, ref: '/about' },
    { name: about, ref: '/' },
    { name: search, ref: '/search' },
    { name: more, ref: '/more' }
  ]

  const handleChange = (): void => {
    const query = setQuery()
    fetch(`/api/search?q=${query}`)
      .then(async res => await res.json())
      .then(data => {
        setResults(data)
      })
      .catch(err => {
        console.error(err)
      })
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchRef.current == null || searchRef.current.value.length === 0)
        return

      router.push(`/search?q=${setQuery()}`).catch(err => {
        console.error(err)
      })
    }
  }

  const { locale, locales } = useRouter()
  const restOfLocale = locales?.filter(l => l !== locale)

  return (
    <Navbar
      variant='sticky'
      className='mb-6'
      shouldHideOnScroll
      onScrollPositionChange={num => setScroll(num)}
    >
      <Navbar.Brand>
        <Navbar.Toggle aria-label='toggle navigation' showIn='sm' />
        <Text color='inherit' hideIn='xs'>
          <Link href='/' className='transition hover:opacity-80'>
            ComicApp
          </Link>
        </Text>
        <p className='font-extralight ml-1'>xkcd</p>
      </Navbar.Brand>
      <Navbar.Content hideIn='xs' variant='underline'>
        <Navbar.Link href='/'>{home}</Navbar.Link>
        <Navbar.Link href='/about'>{about}</Navbar.Link>
        <Navbar.Link href='/more'>{more}</Navbar.Link>
        <Navbar.Item>
          <section className='relative'>
            <input
              ref={searchRef}
              type='search'
              placeholder={`🔍- ${search}`}
              onChange={handleChange}
              className='py-1 px-1 border border-gray-400 rounded-lg'
              onKeyDown={handleKeyPress}
            />
            <div className='absolute top-0 left-0 mt-6 p-2 w-full z-10 '>
              {Boolean(results.length) && scroll === 0 && setQuery() !== '' && (
                <ul className='bg-neutral-50 overflow-hidden bg-opacity-80 border rounded-md shadow-xl'>
                  <li id='all-results'>
                    <Link
                      href={`/search?q=${setQuery()}`}
                      className='w-full inline-block hover:bg-teal-200'
                    >
                      <span className='px-2 py-1 text-xs italic truncate block'>
                        See the following {results.length} results{' '}
                      </span>
                    </Link>
                  </li>

                  {results.map(item => (
                    <li key={item.id}>
                      <Link
                        href={`/comic/${item.id!}`}
                        className='w-full inline-block hover:bg-slate-200'
                      >
                        <span className='px-2 py-1 text-sm font-semibold truncate block'>
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </Navbar.Item>
        <Navbar.Item>
          <section className='relative'>
            <p className='text-sm'>{t('LANGUAGE_NAV')}</p>
            {restOfLocale?.map(l => (
              <Link
                key={l}
                href='/'
                locale={l}
                className='mx-2 transition opacity-70 hover:underline hover:text-gray-700 hover:opacity-100'
              >
                {l}
              </Link>
            ))}
          </section>
        </Navbar.Item>
      </Navbar.Content>

      <Navbar.Collapse>
        {navbarPlaces.map(item => (
          <Navbar.CollapseItem key={item.name}>
            <Link color='inherit' href={item.ref}>
              {item.name}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
