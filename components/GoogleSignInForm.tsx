import { signIn } from "@/auth"
import PendingMessage from "@/parts/PendingMessage"
import SubmitButton from "@/parts/SubmitButon"

const GoogleSignInForm = () => {
  const action = async () => {
    "use server"
    await signIn("google")
  }

  return (
    <form action={action}>
      <SubmitButton color="blue" size="lg">
        Googleログイン
      </SubmitButton>
      <PendingMessage>
        <p> Googleログイン中 </p>
      </PendingMessage>
    </form>
  )
}

export default GoogleSignInForm
