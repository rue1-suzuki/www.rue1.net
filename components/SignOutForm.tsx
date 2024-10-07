import { signOut } from "@/auth"
import PendingMessage from "@/parts/PendingMessage"

const SignOutForm = () => {
  const serverAction = async () => {
    "use server"
    await signOut()
  }

  return (
    <form className="max-w-lg mx-auto flex flex-col justify-center gap-3" action={serverAction}>
      <div className="flex-auto m-auto">
        <button className="text-red-500 underline text-lg font-bold" type="submit">
          ログアウト
        </button>
      </div>
      <PendingMessage>
        <p> ログアウト中 </p>
      </PendingMessage>
    </form>
  )
}

export default SignOutForm
