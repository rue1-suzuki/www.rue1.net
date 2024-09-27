"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const ResetLink = () => {
  const pathname = usePathname()

  return (
    <Link className="text-red-500 text-lg font-bold underline" href={pathname}>
      絞り込みをリセット
    </Link>
  )
}

export default ResetLink
