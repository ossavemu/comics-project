import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { I18nProvider } from '@/context/i18n'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextUIProvider>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </NextUIProvider>
  )
}
