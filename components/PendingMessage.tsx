"use client"
import FullCover from "@/components/FullCover"
import { ComponentProps } from "react"
import { useFormStatus } from "react-dom"

const PendingMessage = (props: ComponentProps<typeof FullCover>) => {
  const { pending } = useFormStatus()

  if (!pending)
    return null

  return (
    <FullCover {...props} />
  )
}

export default PendingMessage
