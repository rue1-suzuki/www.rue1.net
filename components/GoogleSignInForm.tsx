import { signIn } from "@/auth"
import PendingMessage from "@/parts/PendingMessage"
import { GoogleIcon } from "./icons"

const GoogleSignInForm = () => {
  const serverAction = async () => {
    "use server"
    await signIn("google")
  }

  return (
    <form className="max-w-lg mx-auto flex flex-col justify-center gap-3" action={serverAction}>
      <div className="flex-auto m-auto">
        <button className="border px-4 py-2 flex justify-center gap-1" type="submit">
          <GoogleIcon />
          <span className="text-lg font-bold">
            Googleでログイン
          </span>
        </button>
      </div>
      <PendingMessage>
        <p> Googleでログイン中 </p>
      </PendingMessage>
    </form>
  )
}

export default GoogleSignInForm
