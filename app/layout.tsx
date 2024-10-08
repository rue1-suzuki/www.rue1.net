import "@/app/globals.css"
import Header from "@/components/Header"
import { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { ReactNode } from "react"

const nextFont = Noto_Sans_JP({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ポートフォリオサイト",
  description: "ポートフォリオサイト",
}

const RootLayout = async (props: { children: ReactNode }) => {
  const { children } = props

  return (
    <html lang="ja">
      <body className={nextFont.className}>
        <header className="sticky top-0">
          <div className="mb-3">
            <Header />
          </div>
        </header>
        <main className="min-h-dvh">
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
