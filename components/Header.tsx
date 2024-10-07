import Link from "next/link"
import { HomeIcon } from "./icons"

const Header = () => {
  return (
    <div className="bg-gray-500 text-white py-2 flex justify-between gap-1 px-2">
      <h1 className="w-full text-lg font-bold">
        <Link href="">
          ポートフォリオサイト
        </Link>
      </h1>
      <Link href="/">
        <HomeIcon />
      </Link>
    </div>
  )
}

export default Header
