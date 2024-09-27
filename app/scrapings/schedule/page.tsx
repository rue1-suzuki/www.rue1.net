import { auth } from "@/auth"
import convertDateStrToDate from "@/components/convertDateStrToDate"
import ErrorMessage from "@/components/ErrorMessage"
import GoogleSignInForm from "@/components/GoogleSignInForm"
import ScheduleFilterForm from "@/components/ScheduleFilterForm"
import ScheduleTable from "@/components/ScheduleTable"
import ResetLink from "./ResetLink"

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
        revalidate: 60 * 60 * 24, // 24時間
      },
    })

    const schedules: ScheduleType[] = await response.json()

    const now = new Date()

    const minimumFilteredSchedule = schedules.filter((schedule) => {
      return now < convertDateStrToDate(schedule.date, schedule.start)
    })

    return (
      <>
        <div className="mb-3">
          <ScheduleFilterForm schedules={minimumFilteredSchedule} />
        </div>

        <div className="mb-3">
          <div className="text-center">
            <ResetLink />
          </div>
        </div>

        <div className="mb-3">
          <ScheduleTable schedules={minimumFilteredSchedule} />
        </div>
      </>
    )
  } catch (error) {
    return (<ErrorMessage error={error} />)
  }
}

export default ScrapingSchedulePage
