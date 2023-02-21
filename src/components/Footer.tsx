import { useI18n } from '@/context/i18n'
import Link from 'next/link'

export default function Footer (): JSX.Element {
  const { t } = useI18n()
  const [trad, mention, source] = t('FOOTER').split('&')
  return (
    <div className='bottom-0 w-full mt-2'>
      <footer className='text-center py-4 bg-gray-100'>
        <p className='text-sm max-w-xl mx-auto text-center font-semibold'>
          {/* Comics by&nbsp;
          <Link href='https://xkcd.com/license.html' className='text-blue-400'>
            xkcd&nbsp;
          </Link>
          is licensed under a&nbsp;
          <Link href='https://creativecommons.org/licenses/by-nc/2.5/' className='text-blue-400'>
            Creative Commons Attribution-NonCommercial 2.5 License.&nbsp;
          </Link>
          Web App created by: <Link href='https://github.com/ossavemu' className='text-emerald-600 transition hover:text-violet-600'>Oscar Velez&nbsp;</Link>
          This project was inspired by the&nbsp;
          <Link href='https://youtu.be/pFT8wD2uRSE' className='text-blue-400'>course&nbsp;</Link>
          of amazing tech teacher&nbsp;
          <Link href='https://midu.dev/' className='text-blue-400'>midudev.</Link>
          <br />ossavemu-2023 - source code */}
          {trad}
          <br />
          <Link
            href='https://youtu.be/pFT8wD2uRSE'
            className='text-red-400 hover:text-emerald-400'
          >
            {mention}
          </Link>
          <Link
            href='https://midu.dev/'
            className='text-blue-400 hover:text-orange-400'
          >
            midudev.
          </Link>
          <br />
          <Link
            href='https://github.com/ossavemu'
            className='text-emerald-600 hover:text-violet-600'
          >
            {source}
          </Link>
        </p>
      </footer>
    </div>
  )
}
