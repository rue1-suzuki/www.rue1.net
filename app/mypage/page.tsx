import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import EventForm from "@/components/EventForm"
import OrganizerForm from "@/components/OrganizerForm"
import Table from "@/components/Table"
import { prisma } from "@/prisma"
import { redirect } from "next/navigation"
import { cache } from "react"

const getOrganizer = cache(async (email: string) => {
  return prisma.organizer.findUnique({
    where: {
      email: email,
    },
  })
})

const getEvents = cache(async (email: string) => {
  return prisma.event.findMany({
    where: {
      organizer: {
        email: email,
      }
    },
  })
})

const MyPagePage = async () => {
  try {
    const sessionUserEmail = (await auth())?.user?.email
    if (!sessionUserEmail)
      redirect("/")

    const [
      organizer,
      events,
    ] = await Promise.all([
      getOrganizer(sessionUserEmail),
      getEvents(sessionUserEmail),
    ])

    return (
      <>
        <div className="mb-3">
          <OrganizerForm
            email={sessionUserEmail}
            organizer={organizer ?? undefined}
          />
        </div>

        {organizer &&
          <>
            <div className="mb-3">
              <EventForm organizer={organizer} />
            </div>

            {events.length === 0 &&
              <div className="mb-3">
                <div className="text-center">
                  <p> まだイベントを作成していません </p>
                </div>
              </div>
            }
            {events.length > 0 &&
              <div className="mb-3">
                <Table>
                  <thead className="bg-gray-50">
                    <tr className="border-y">
                      <th className="p-2"> イベント名 </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => {
                      return (
                        <tr className="border-y" key={event.id}>
                          <td className="p-2"> {event.name} </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            }
          </>
        }
      </>
    )
  } catch (error) {
    console.error(error)
    return (<ErrorMessage error={error} />)
  }
}

export default MyPagePage


