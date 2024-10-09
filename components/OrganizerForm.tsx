import Form from "@/components/Form"
import PendingMessage from "@/components/PendingMessage"
import { GreenSubmitButton } from "@/components/SubmitButons"
import { prisma } from "@/prisma"
import { Organizer } from "@prisma/client"
import { revalidatePath } from "next/cache"

const serverAction = async (formData: FormData) => {
  "use server"
  const email = formData.get("email")?.toString()
  if (!email)
    throw new Error("メールアドレスが見つかりません。")

  const name = formData.get("name")?.toString()
  if (!name)
    throw new Error("ハンドルネームを入力してください。")

  try {
    const organizer = await prisma.organizer.upsert({
      select: {
        id: true,
      },
      where: {
        email: email,
      },
      create: {
        email: email,
        name: name,
      },
      update: {
        name: name,
      },
    })
    console.info(organizer)
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    revalidatePath("/mypage")
  }
}

const OrganizerForm = (props: {
  email: string
  organizer?: Organizer
}) => {
  const { email, organizer, } = props

  return (
    <Form action={serverAction}>
      <input
        name="email"
        type="hidden"
        value={email}
        required
      />
      <div className="flex flex-col justify-center gap-1">
        <label>
          <span className="text-lg font-bold text-gray-500 mx-1">
            ハンドルネーム
          </span>
          <span className="text-sm font-semibold text-red-500 mx-1">
            必須
          </span>
        </label>
        <input
          className="border rounded text-center m-1 p-2"
          name="name"
          type="text"
          defaultValue={organizer?.name}
          autoComplete="off"
          required
        />
        <p className="text-sm font-semibold text-red-500">
          このハンドルネームは公に公開されます。
        </p>
        {organizer?.name &&
          <p className="text-sm text-gray-500">
            現在のハンドルネーム: {organizer.name}
          </p>
        }
      </div>
      <div className="text-center">
        <GreenSubmitButton>
          <p> {organizer ? <> 主催者情報を更新 </> : <> 主催者情報を登録 </>} </p>
        </GreenSubmitButton>
      </div>
      <PendingMessage>
        <p> {organizer ? <> 主催者情報を更新中 </> : <> 主催者情報を登録中 </>} </p>
      </PendingMessage>
    </Form>
  )
}

export default OrganizerForm