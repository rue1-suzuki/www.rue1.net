import Link from "next/link"
import { HomeIcon } from "./icons"

const Header = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gray-500 text-white py-2 flex justify-between gap-1 px-2">
        <h1 className="w-full text-lg font-bold">
          <Link href="">
            ポートフォリオサイト
          </Link>
        </h1>
        <Link href="/">
          <HomeIcon />
        </Link>
      </div>
      <div className="pt-11" />
    </>
  )
}

export default Header
