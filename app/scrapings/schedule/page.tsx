import ScheduleTable from "@/app/ScheduleTable"
import FilterForm from "./FilterForm"

const ScrapingSchedulePage = async () => {
  try {
    const response = await fetch("https://scraping.rue1.net/schedule", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 1, // 1時間
      }
    })

    const schedules: ScheduleType[] = await response.json()

    return (
      <>
        <div className="mb-3">
          <FilterForm schedules={schedules} />
        </div>

        <div className="mb-3">
          <ScheduleTable schedules={schedules} />
        </div>
      </>
    )
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : '不明なエラー'

    return (
      <div className="mb-3">
        <div className="text-center">
          <p className="text-sun font-bold">
            {errorMessage}
          </p>
        </div>
      </div>
    )
  }
}

export default ScrapingSchedulePage
