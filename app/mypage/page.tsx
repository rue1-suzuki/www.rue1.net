import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import { prisma } from "@/prisma"
import { redirect } from "next/navigation"
import OrganizerForm from "./OrganizerForm"

const MyPagePage = async () => {
  try {
    const session = await auth()

    const sessionUserEmail = session?.user?.email

    if (!sessionUserEmail) {
      redirect("/")
    }

    const organizer = await prisma.organizer.findUnique({
      where: {
        email: sessionUserEmail,
      }
    })

    return (
      <div className="mb-3">
        <OrganizerForm
          email={sessionUserEmail}
          organizer={organizer ?? undefined}
        />
      </div>
    )
  } catch (error) {
    return (<ErrorMessage error={error} />)
  }
}

export default MyPagePage


