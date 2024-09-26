import "@/app/globals.css"
import Header from '@/components/Header'
import { Noto_Sans_JP } from 'next/font/google'
import Link from 'next/link'

const noto = Noto_Sans_JP({
  subsets: ["latin"],
})

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang="ja">
      <body className={noto.className}>
        <header>
          <div className="mb-3">
            <Header>
              <Link href="/">
                ポートフォリオサイト
              </Link>
            </Header>
          </div>
        </header>
        <main className='min-h-dvh'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
