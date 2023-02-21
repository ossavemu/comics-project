import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: JSX.Element
}

export default function Layout ({ children }: LayoutProps): JSX.Element {
  return (
    <div className='flex flex-col h-screen w-full '>
      <Header />
      <main className='mx-auto flex-grow'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
