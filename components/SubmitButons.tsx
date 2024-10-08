"use client"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { useFormStatus } from "react-dom"

const defaultClassName = "border rounded disabled:bg-opacity-50 px-4 py-2 text-lg font-bold"

type SubmitButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const SubmitButton = (props: SubmitButtonProps) => {
  const { children } = props

  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} {...props}>
      {children}
    </button>
  )
}

export const BlueSubmitButton = (props: SubmitButtonProps) => {
  return (<SubmitButton className={`${defaultClassName} bg-blue-700 text-white`} {...props} />)
}

export const RedSubmitButton = (props: SubmitButtonProps) => {
  return (<SubmitButton className={`${defaultClassName} bg-red-700 text-white`} {...props} />)
}

export const GreenSubmitButton = (props: SubmitButtonProps) => {
  return (<SubmitButton className={`${defaultClassName} bg-green-700 text-white`} {...props} />)
}