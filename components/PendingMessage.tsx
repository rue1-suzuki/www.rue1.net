"use client"
import FullCover from "@/components/FullCover"
import { useFormStatus } from "react-dom"

interface PendingMessageProps {
  children: React.ReactNode
}

const PendingMessage = (props: PendingMessageProps) => {
  const { children } = props

  const { pending } = useFormStatus()

  if (pending) {
    return (
      <FullCover>
        {children}
      </FullCover>
    )
  }
}

export default PendingMessage
