import Header from "@/components/Header"
import Link from "next/link"
import "./globals.css"

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang="ja">
      <body>
        <header>
          <div className="mb-3">
            <Header>
              <Link href="/">
                ポートフォリオサイト
              </Link>
            </Header>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
