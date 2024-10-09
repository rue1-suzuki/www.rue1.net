import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import OrganizerForm from "@/components/OrganizerForm"
import { prisma } from "@/prisma"
import { redirect } from "next/navigation"
import { cache } from "react"

const findOrganizer = cache(async (email: string) => {
  return prisma.organizer.findUnique({
    where: {
      email: email,
    },
  })
})

const MyPagePage = async () => {
  try {
    const sessionUserEmail = (await auth())?.user?.email
    if (!sessionUserEmail)
      redirect("/")

    const organizer = await findOrganizer(sessionUserEmail)

    return (
      <div className="mb-3">
        <OrganizerForm
          email={sessionUserEmail}
          organizer={organizer ?? undefined}
        />
      </div>
    )
  } catch (error) {
    console.error(error)
    return (<ErrorMessage error={error} />)
  }
}

export default MyPagePage
