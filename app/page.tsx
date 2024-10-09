import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import Header from "@/components/Header"
import LinkList from "@/components/LinkList"
import SignOutForm from "@/components/SignOutForm"

const snsLinkItems = [
  {
    href: new URL("https://twitter.com/Rue1DM").href,
    children: <> Twitter | ルゥ/Rue1DM </>
  },
  {
    href: new URL("https://twitter.com/Akita_CS").href,
    children: <> Twitter | 秋田CS </>,
  },
]

const anonymousLinkItems = [
  {
    href: new URL("https://swiss.rue1.net").href,
    children: <> すいすいスイスドロー </>,
  },
  {
    href: new URL("https://oyatu.rue1.net").href,
    children: <> おやつチェッカー </>,
  },
  {
    href: new URL("https://em.rue1.net").href,
    children: <> EM -EventManager- </>,
  },
]

const scrapingLinkItems = [
  {
    href: "https://scraping.rue1.net/docs",
    children: <> スクレイピング | ドキュメント </>
  },
  {
    href: "/scrapings/schedule",
    children: <> スクレイピング | 大会日程 </>
  },
]

const sessionUserLinkItems = [
  {
    href: "/mypage",
    children: <> マイページ </>,
  },
  {
    href: "/events",
    children: <> イベント管理 </>,
  },
]

const HomePage = async () => {
  try {
    const session = await auth()

    return (
      <>
        <div className="mb-3">
          <Header>
            トップページ
          </Header>
        </div>

        {!session?.user &&
          <div className="mb-3">
            <GoogleSignInForm />
          </div>
        }

        <div className="mb-3">
          <div className="text-center">
            <LinkList linkItems={snsLinkItems} />
          </div>
        </div>

        <div className="mb-3">
          <div className="text-center">
            <LinkList linkItems={anonymousLinkItems} />
          </div>
        </div>

        {session?.user &&
          <div className="mb-3">
            <div className="text-center">
              <LinkList linkItems={scrapingLinkItems} />
            </div>
          </div>
        }

        {session?.user &&
          <div className="mb-3">
            <div className="text-center">
              <LinkList linkItems={sessionUserLinkItems} />
            </div>
          </div>
        }

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
