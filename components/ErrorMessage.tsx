const ErrorMessage = (props: {
  error: unknown,
}) => {
  const { error } = props

  if (error instanceof Error) {
    return (
      <div className="mb-3">
        <div className="text-center">
          <p className="text-red-500 font-bold">
            {error.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-3">
      <div className="text-center">
        <p className="text-red-500 font-bold">
          不明なエラー
        </p>
      </div>
    </div>
  )
}

export default ErrorMessage
