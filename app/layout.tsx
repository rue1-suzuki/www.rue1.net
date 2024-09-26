import { Noto_Sans_JP } from 'next/font/google'
import "./globals.css"

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
        {children}
      </body>
    </html>
  )
}

export default RootLayout
