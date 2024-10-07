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
        isExternal: true,
      },
      {
        icon: <LinkIcon />,
        href: new URL("https://twitter.com/Akita_CS").href,
        label: <> Twitter@DM秋田CS </>,
        isExternal: true,
      },
      {
        icon: <TournamentIcon />,
        href: new URL("https://em.rue1.net").href,
        label: <> EM -EventManager- </>,
        isExternal: true,
      },
      {
        icon: <ScheduleIcon />,
        href: "/scrapings/schedule",
        label: <> スクレイピング 大会日程 </>,
        isExternal: false,
      },
    ]

    return (
      <>
        {!session?.user &&
          <div className="mb-3">
            <GoogleSignInForm />
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
            <div className="flex flex-col justify-center gap-1 m-1 p-1">
              {linkItems.map((item) => {
                const externalProps = item.isExternal ? {
                  target: "_blank",
                  rel: "noopener noreferrer",
                } : {}

                return (
                  <Link className="border rounded px-4 py-2 text-blue-500 underline text-lg font-bold" href={item.href} key={item.href} {...externalProps}>
                    <div className="flex justify-start items-center gap-1">
                      {item.icon}
                      {item.label}
                      {item.isExternal &&
                        <OpenInNewIcon width="0.8rem" height="0.8rem" />
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
            <SignOutForm />
          </div>
        }
      </>
    )
  } catch (error) {
    return (<ErrorMessage error={error} />)
  }
}

export default HomePage
