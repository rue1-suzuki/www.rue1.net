import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import OrganizerForm from "@/components/OrganizerForm"
import { findOrganizer } from "@/prisma"
import { redirect } from "next/navigation"

const MyPagePage = async () => {
  try {
    const sessionUserEmail = (await auth())?.user?.email
    if (!sessionUserEmail)
      redirect("/")

    const organizer = await findOrganizer(sessionUserEmail)

    return (
      <div className="mb-10">
        <OrganizerForm
          email={sessionUserEmail}
          organizer={organizer ?? undefined}
          path="/mypage"
        />
      </div>
    )
  } catch (error) {
    console.error(error)
    return (<ErrorMessage error={error} />)
  }
}

export default MyPagePage
