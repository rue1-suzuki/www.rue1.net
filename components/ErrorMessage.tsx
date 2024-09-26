interface ErrorMessageProps {
  error: unknown
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { error } = props

  if (error instanceof Error) {
    return (
      <div className="mb-3">
        <div className="text-center">
          <p className="text-sun font-bold">
            {error.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-3">
      <div className="text-center">
        <p className="text-sun font-bold">
          不明なエラー
        </p>
      </div>
    </div>
  )
}

export default ErrorMessage
