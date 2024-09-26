import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import { LinkIcon, OpenInNewIcon, ScheduleIcon, TournamentIcon } from "@/components/icons"
import SignOutForm from "@/components/SignOutForm"
import Link from "next/link"

const HomePage = async () => {
  try {
    const session = await auth()

    const linkItems = [
      {
        icon: <LinkIcon />,
        href: new URL("https://twitter.com/Rue1DM").href,
        label: <> Twitter@ルゥ/Rue1DM </>,
      },
      {
        icon: <LinkIcon />,
        href: new URL("https://twitter.com/Akita_CS").href,
        label: <> Twitter@DM秋田CS </>,
      },
      {
        icon: <TournamentIcon />,
        href: new URL("https://em.rue1.net").href,
        label: <> EM -EventManager- </>,
      },
      {
        icon: <ScheduleIcon />,
        href: "/scrapings/schedule",
        label: <> スクレイピング 大会日程 </>,
      },
    ]

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
            <div className="flex flex-col justify-center gap-3 m-1 p-1">
              {linkItems.map((item) => {
                const isExternal = item.href.startsWith("http")
                const target = isExternal ? "_blank" : undefined
                const rel = isExternal ? "noopener noreferrer" : undefined

                return (
                  <Link className="border rounded px-4 py-2 text-blue-500 underline text-lg font-bold" href={item.href} target={target} rel={rel} key={item.href}>
                    <div className="flex justify-start items-center gap-1">
                      {item.icon}
                      {item.label}
                      {isExternal &&
                        <OpenInNewIcon className="fill-current w-[0.8rem] h-[0.8rem]" />
                      }
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
      </>
    )
  } catch (error) {
    return (<ErrorMessage error={error} />)
  }
}

export default HomePage
