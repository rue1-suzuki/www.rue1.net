import { HomeIcon } from "@/components/icons"
import Link from "next/link"
import { ReactNode } from "react"

const Header = (props: {
  href?: string,
  children: ReactNode,
}) => {
  const { href, children, } = props

  return (
    <div className="bg-gray-500 text-white py-2 flex justify-between gap-1 px-2">
      <h1 className="w-full text-lg font-bold">
        {href
          ? <Link href={href}> {children} </Link>
          : <> {children} </>
        }
      </h1>
      <Link href="/">
        <HomeIcon />
      </Link>
    </div>
  )
}

export default Header
