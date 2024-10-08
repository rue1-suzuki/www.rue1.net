import { DetailedHTMLProps, FormHTMLAttributes } from "react"

const Form = (props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => {
  const { children } = props

  return (
    <form className="flex flex-col justify-center gap-3 text-center max-w-md mx-auto" {...props}>
      {children}
    </form>
  )
}

export default Form