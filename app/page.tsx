import { auth } from "@/auth"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import SignOutForm from "@/components/SignOutForm"
import Link from "next/link"

const HomePage = async () => {
  const session = await auth()

  if (!session?.user) {
    return (
      <>
        <div className="mb-3">
          <div className="text-center">
            <GoogleSignInForm />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
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

      <div className="mb-3">
        <div className="flex flex-col justify-center gap-3">
          <Link className="text-blue-500 underline" href={"/scrapings/schedule"}>
            スクレイピング 大会日程
          </Link>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-center">
          <SignOutForm />
        </div>
      </div>
    </>
  )
}

export default HomePage
