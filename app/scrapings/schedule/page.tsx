import convertDateStrToDate from "@/components/convertDateStrToDate"
import ErrorMessage from "@/components/ErrorMessage"
import Header from "@/components/Header"
import ScheduleFilterForm from "@/components/ScheduleFilterForm"
import ScheduleTable from "@/components/ScheduleTable"
import { Metadata } from "next"
import ResetLink from "./ResetLink"

export const metadata: Metadata = {
  title: "スクレイピング | 大会日程",
  description: "スクレイピング | 大会日程",
}

const ScrapingSchedulePage = async () => {
  try {
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

    const now = convertDateStrToDate(new Date().toLocaleDateString("ja-JP", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }))

    const minimumFilteredSchedules = schedules.filter((schedule) => {
      return now <= convertDateStrToDate(schedule.date)
    })

    return (
      <>
        <div className="mb-3">
          <Header>
            スクレイピング 大会日程
          </Header>
        </div>

        <div className="mb-3">
          <ScheduleFilterForm schedules={minimumFilteredSchedules} />
        </div>

        <div className="mb-3">
          <div className="text-center">
            <ResetLink />
          </div>
        </div>

        <div className="mb-3">
          <ScheduleTable schedules={minimumFilteredSchedules} />
        </div>
      </>
    )
  } catch (error) {
    return (<ErrorMessage error={error} />)
  }
}

export default ScrapingSchedulePage
