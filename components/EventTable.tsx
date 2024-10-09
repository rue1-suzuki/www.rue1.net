import Table from "@/components/Table"
import { Event } from "@prisma/client"

const EventTable = (props: {
  events: Event[],
}) => {
  const { events } = props

  return (
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
  )
}

export default EventTable
