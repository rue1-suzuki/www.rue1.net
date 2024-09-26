import { auth } from "@/auth"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import Header from "@/components/Header"
import SignOutForm from "@/components/SignOutForm"
import Link from "next/link"
import { ScheduleIcon, TournamentIcon } from "./icons"

const HomePage = async () => {
  try {
    const session = await auth()

    const linkItems = [
      {
        icon: <TournamentIcon />,
        href: "https://em.rue1.net",
        label: <> em.rue1.net </>,
      },
      {
        icon: <ScheduleIcon />,
        href: "/scrapings/schedule",
        label: <> スクレイピング 大会日程 </>,
      },
    ]

    return (
      <>
        <header>
          <div className="mb-3">
            <Header>
              <Link href="/">
                ポートフォリオサイト
              </Link>
            </Header>
          </div>
        </header>

        <main>
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
                {linkItems.map((item) => {
                  const target = item.href.startsWith("http")
                    ? "_blank"
                    : undefined

                  const rel = item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined

                  return (
                    <Link className="border rounded px-4 py-2 text-blue-500 underline text-lg font-bold" href={item.href} target={target} rel={rel} key={item.href}>
                      <div className="flex justify-start items-center gap-1">
                        {item.icon}
                        {item.label}
                      </div>
                    </Link>
                  )
                })}
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
        </main>
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
