import Link from "next/link"
import { OpenInNewIcon } from "./icons"

const LinkList = (props: {
  linkItems: {
    href: string
    children: JSX.Element
  }[]
}) => {
  const { linkItems } = props

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col justify-center gap-1 border rounded m-1 p-1">
        {linkItems.map((item) => {
          const isExternal = item.href.startsWith("http")

          const externalProps = isExternal ? {
            target: "_blank",
            rel: "noopener noreferrer",
          } : {}

          return (
            <Link className="border rounded px-4 py-2 text-blue-500 text-lg font-bold hover:bg-blue-50" href={item.href} key={item.href} {...externalProps}>
              <div className="flex justify-start items-center gap-1">
                {item.children}
                {isExternal &&
                  <OpenInNewIcon width="1rem" height="1rem" />
                }
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LinkList
