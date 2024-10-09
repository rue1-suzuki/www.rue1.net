import { isRedirectError } from "next/dist/client/components/redirect"

const ErrorMessage = (props: {
  error: unknown,
}) => {
  const { error } = props

  if (isRedirectError(error)) {
    throw error
  }

  return (
    <div className="mb-3">
      <div className="text-center">
        <p className="text-red-500 text-lg font-bold">
          {error instanceof Error
            ? <> {error.message} </>
            : <> 不明なエラー </>
          }
        </p>
      </div>
    </div>
  )
}

export default ErrorMessage
