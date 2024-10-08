import { DetailedHTMLProps, TableHTMLAttributes } from "react"

const Table = (props: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) => {
  const { children } = props

  return (
    <table className="w-full max-w-lg mx-auto text-center" {...props}>
      {children}
    </table>
  )
}

export default Table