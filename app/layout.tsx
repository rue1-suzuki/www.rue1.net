import "@/app/globals.css"
import { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "RUE1 | %s",
    default: "RUE1 | ポートフォリオサイト",
  }
}

const nextFont = Noto_Sans_JP({
  subsets: ["latin"],
})

const RootLayout = async (props: { children: ReactNode }) => {
  const { children } = props

  return (
    <html lang="ja">
      <body className={nextFont.className}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
