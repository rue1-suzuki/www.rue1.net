import { signOut } from "@/auth"
import PendingMessage from "@/parts/PendingMessage"
import SubmitButton from "@/parts/SubmitButon"

const SignOutForm = () => {
  const serverAction = async () => {
    "use server"
    await signOut()
  }

  return (
    <form action={serverAction}>
      <SubmitButton color="red" size="md">
        ログアウト
      </SubmitButton>
      <PendingMessage>
        <p> ログアウト中 </p>
      </PendingMessage>
    </form>
  )
}

export default SignOutForm
