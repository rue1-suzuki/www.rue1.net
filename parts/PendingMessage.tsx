"use client"
import { useFormStatus } from "react-dom"
import FullCover from "./FullCover"

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
