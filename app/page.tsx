import { auth } from "@/auth"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import SignOutForm from "@/components/SignOutForm"
import Link from "next/link"

const HomePage = async () => {
  try {
    const session = await auth()

    return (
      <>
        {!session?.user &&
          <div className="mb-3">
            <div className="text-center">
              <GoogleSignInForm />
            </div>
          </div>
        }

        {session?.user &&
          <div className="mb-3">
            <div className="text-center">
              <p> {session.user.id} </p>
              <p> {session.user.name} </p>
              <p> {session.user.email} </p>
              <p>
                {new Date(session.expires).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
          </div>
        }

        <div className="mb-3">
          <div className="text-center">
            <div className="flex flex-col justify-center gap-3">
              <Link className="text-blue-500 underline" href="https://em.rue1.net">
                em.rue1.net
              </Link>
              <Link className="text-blue-500 underline" href="/scrapings/schedule">
                スクレイピング 大会日程
              </Link>
            </div>
          </div>
        </div>

        {session?.user &&
          <div className="mb-3">
            <div className="text-center">
              <SignOutForm />
            </div>
          </div>
        }
      </>
    )
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : '不明なエラー'

    return (
      <div className="mb-3">
        <div className="text-center">
          <p className="text-sun font-bold">
            {errorMessage}
          </p>
        </div>
      </div>
    )
  }
}

export default HomePage
