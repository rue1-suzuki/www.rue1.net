import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import EventForm from "@/components/EventForm"
import OrganizerForm from "@/components/OrganizerForm"
import Table from "@/components/Table"
import { prisma } from "@/prisma"
import { redirect } from "next/navigation"

const MyPagePage = async () => {
  try {
    const session = await auth()

    const sessionUserEmail = session?.user?.email

    if (!sessionUserEmail) {
      redirect("/")
    }

    const organizer = await prisma.organizer.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        events: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            name: true,
          }
        }
      },
      where: {
        email: sessionUserEmail,
      },
    })

    return (
      <>
        <div className="mb-3">
          <OrganizerForm
            email={sessionUserEmail}
            organizer={organizer ?? undefined}
          />
        </div>

        {organizer?.events &&
          <>
            <div className="mb-3">
              <EventForm organizer={organizer} />
            </div>

            {organizer.events.length === 0 &&
              <div className="mb-3">
                <div className="text-center">
                  <p> まだイベントを作成していません </p>
                </div>
              </div>
            }
            {organizer.events.length > 0 &&
              <div className="mb-3">
                <Table>
                  <thead className="bg-gray-50">
                    <tr className="border-y">
                      <th className="p-2"> イベント名 </th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizer.events.map((event) => {
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
    return (<ErrorMessage error={error} />)
  }
}

export default MyPagePage


