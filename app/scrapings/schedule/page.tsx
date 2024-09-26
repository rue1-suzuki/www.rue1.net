import { auth } from "@/auth"
import ErrorMessage from "@/components/ErrorMessage"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import ScheduleFilterForm from "@/components/ScheduleFilterForm"
import ScheduleTable from "@/components/ScheduleTable"

const ScrapingSchedulePage = async () => {
  try {
    const session = await auth()
    if (!session?.user) {
      return (
        <div className="mb-3">
          <div className="text-center">
            <GoogleSignInForm />
          </div>
        </div>
      )
    }

    const response = await fetch("https://scraping.rue1.net/schedule", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 24, // 1時間
      },
    })

    const schedules: ScheduleType[] = await response.json()

    return (
      <>
        <div className="mb-3">
          <ScheduleFilterForm schedules={schedules} />
        </div>

        <div className="mb-3">
          <ScheduleTable schedules={schedules} />
        </div>
      </>
    )
  } catch (error) {
    return (<ErrorMessage error={error} />)
  }
}

export default ScrapingSchedulePage
