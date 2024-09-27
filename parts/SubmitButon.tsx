"use client"
import { useMemo } from "react"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
  children: React.ReactNode
  color: "blue" | "red" | "white"
  size: "sm" | "md" | "lg"
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { children, color, size, } = props

  const { pending } = useFormStatus()

  const colorClassName = useMemo(() => {
    switch (color) {
      case "blue":
        return "bg-blue-500 text-white"
      case "red":
        return "bg-red-500 text-white"
    }
  }, [color])

  const sizeClassName = useMemo(() => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-sm font-bold"
      case "md":
        return "px-2 py-2 text-md font-bold"
      case "lg":
        return "px-4 py-2 text-lg font-bold"
    }
  }, [size])

  const className = useMemo(() => {
    return `border rounded disabled:bg-opacity-50 ${colorClassName} ${sizeClassName}`
  }, [colorClassName, sizeClassName,])

  return (
    <button className={className} type="submit" disabled={pending}>
      {children}
    </button>
  )
}

export default SubmitButton
