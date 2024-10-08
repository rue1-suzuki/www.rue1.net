"use client"
import { HTMLAttributes } from "react"
import { useFormStatus } from "react-dom"

const defaultClassName = "border rounded disabled:bg-opacity-50"

const SubmitButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const { children } = props

  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} {...props}>
      {children}
    </button>
  )
}

export const BlueSubmitButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (<SubmitButton className={`${defaultClassName} bg-blue-500 text-white`} {...props} />)
}

export const RedSubmitButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (<SubmitButton className={`${defaultClassName} bg-red-500 text-white`} {...props} />)
}

export const GreenSubmitButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (<SubmitButton className={`${defaultClassName} bg-green-500 text-white`} {...props} />)
}