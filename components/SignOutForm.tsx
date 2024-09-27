import { signOut } from "@/auth"
import PendingMessage from "@/parts/PendingMessage"

const SignOutForm = () => {
  const serverAction = async () => {
    "use server"
    await signOut()
  }

  return (
    <form className="max-w-lg m-auto" action={serverAction}>
      <button className="text-red-500 underline text-lg font-bold" type="submit">
        ログアウト
      </button>
      <PendingMessage>
        <p> ログアウト中 </p>
      </PendingMessage>
    </form>
  )
}

export default SignOutForm
