import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import EventForm from "@/components/EventForm"
import EventTable from "@/components/EventTable"
import { findEventMany, findOrganizer } from "@/prisma"
import { redirect } from "next/navigation"

const EventsPage = async () => {
  try {
    const sessionUserEmail = (await auth())?.user?.email
    if (!sessionUserEmail)
      redirect("/")

    const [
      organizer,
      events,
    ] = await Promise.all([
      findOrganizer(sessionUserEmail),
      findEventMany(sessionUserEmail),
    ])

    return (
      <>
        {organizer &&
          <div className="mb-10">
            <EventForm organizer={organizer} path="/events" />
          </div>
        }

        {events.length === 0 &&
          <div className="mb-10">
            <div className="text-center">
              <p> まだイベントを作成していません </p>
            </div>
          </div>
        }

        {events.length > 0 &&
          <div className="mb-10">
            <EventTable events={events} />
          </div>
        }
      </>
    )
  } catch (error) {
    console.error(error)
    return (<ErrorMessage error={error} />)
  }
}

export default EventsPage
