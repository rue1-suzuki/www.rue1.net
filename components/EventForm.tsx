import Form from "@/components/Form"
import PendingMessage from "@/components/PendingMessage"
import { GreenSubmitButton } from "@/components/SubmitButons"
import { prisma } from "@/prisma"
import { Event, Organizer } from "@prisma/client"
import { revalidatePath } from "next/cache"

const serverAction = async (formData: FormData) => {
  "use server"
  const name = formData.get("name")?.toString()
  if (!name)
    throw new Error("イベント名を入力してください。")

  const organizerId = formData.get("organizerId")?.toString()
  if (!organizerId)
    throw new Error("主催者IDが見つかりません。")

  const eventId = formData.get("eventId")?.toString()

  const event = await (eventId
    ? prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        name: name,
      },
    })
    : prisma.event.create({
      data: {
        organizerId: organizerId,
        name: name,
      },
    })
  )

  console.info(event)
  revalidatePath("/mypage")
}

const EventForm = (props: {
  organizer: Organizer
  event?: Event
}) => {
  const { organizer, event, } = props

  if (event && (event.organizerId !== organizer.id))
    return (
      <div className="text-center">
        <p> 更新権限がありません </p>
      </div>
    )

  return (
    <Form action={serverAction}>
      <input
        name="organizerId"
        type="hidden"
        value={organizer.id}
        required
      />
      <input
        name="eventId"
        type="hidden"
        value={event?.id}
      />
      <div className="flex flex-col justify-center gap-1">
        <label>
          <span className="text-lg font-bold text-gray-500 mx-1">
            イベント名
          </span>
          <span className="text-sm font-semibold text-red-500 mx-1">
            必須
          </span>
        </label>
        <input
          className="border rounded text-center m-1 p-2"
          name="name"
          type="text"
          defaultValue={event?.name}
          autoComplete="off"
          required
        />
        {event?.name &&
          <p className="text-sm text-gray-500">
            現在のイベント名: {event.name}
          </p>
        }
      </div>
      <div className="text-center">
        <GreenSubmitButton>
          <p> {event ? <> イベント情報を更新 </> : <> 新規イベントを作成 </>} </p>
        </GreenSubmitButton>
      </div>
      <PendingMessage>
        <p> {event ? <> イベント情報を更新中 </> : <> 新規イベントを作成中 </>} </p>
      </PendingMessage>
    </Form>
  )
}

export default EventForm