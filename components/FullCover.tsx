import { DetailedHTMLProps, HTMLAttributes } from "react"

const FullCover = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { children } = props

  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 text-white flex flex-col gap-3 justify-center text-2xl font-bold text-center z-50">
      {children}
    </div>
  )
}

export default FullCover
