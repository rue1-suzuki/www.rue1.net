"use client"
import convertDateStrToDate from "@/components/convertDateStrToDate"
import schedulesCompareFn from "@/components/schedulesCompareFn"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

interface ScheduleTableProps {
  schedules: ScheduleType[]
}

const ScheduleTable = (props: ScheduleTableProps) => {
  const searchParams = useSearchParams()

  const schedules = useMemo(() => {
    const selectedDates = searchParams.getAll("date")
    const selectedLocations = searchParams.getAll("location")
    const selectedFormats = searchParams.getAll("format")

    return props.schedules.filter((schedule) => {
      if (selectedDates.length > 0)
        if (!selectedDates.includes(schedule.date))
          return false
      if (selectedLocations.length > 0)
        if (!selectedLocations.includes(schedule.location))
          return false
      if (selectedFormats.length > 0)
        if (!selectedFormats.includes(schedule.format))
          return false
      return true
    })
  }, [props.schedules, searchParams,])

  const scheduleItems = useMemo(() => {
    const scheduleDates = Array.from(new Set(schedules.map((schedule) => schedule.date)))

    return scheduleDates.map((date) => {
      const currentSchedules = schedules.filter((schedule) => schedule.date === date)

      return {
        date: date,
        schedules: currentSchedules,
      }
    })
  }, [schedules])

  if (scheduleItems.length === 0)
    return (
      <div className="text-center">
        <p> 該当するイベントなし </p>
      </div>
    )

  return (
    <>
      {scheduleItems.map((scheduleItem) => {
        if (scheduleItem.schedules.length === 0)
          return null

        return (
          <div className="mb-3" key={scheduleItem.date}>
            <table className="w-full text-center">
              <thead className="bg-gray-100">
                <tr className="border-y">
                  <th className="w-1/5 p-2"> 開催地 </th>
                  <th className="w-3/5 p-2">
                    {convertDateStrToDate(scheduleItem.date).toLocaleString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      weekday: "short",
                    })}
                  </th>
                  <th className="w-1/5 p-2"> 定員 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleItem.schedules.sort(schedulesCompareFn).map((schedule) => {
                  const isTeam = schedule.name.indexOf("チーム") > 0
                  const isBig = !isTeam && schedule.capacity >= 100

                  return (
                    <tr className={`border-y ${isBig ? "bg-blue-50 text-blue-500 font-bold" : ""}`} key={schedule.url}>
                      <td className="p-2">
                        <p className="text-lg font-bold">
                          {schedule.location}
                        </p>
                      </td>
                      <td className="p-2">
                        <p className="text-sm">
                          {convertDateStrToDate(schedule.date, schedule.start).toLocaleString("ja-JP", {
                            hour: "numeric",
                            minute: "numeric",
                          })}開始
                        </p>
                        <p className="text-sm">
                          <Link className="text-blue-500 underline" href={schedule.url} target="_blank" rel="noreferer">
                            {schedule.name}
                          </Link>
                        </p>
                        <p className="text-sm">
                          【{schedule.format}】
                        </p>
                      </td>
                      <td className="p-2">
                        <p className="text-lg font-bold">
                          {schedule.capacity}名
                        </p>
                        {isTeam &&
                          <p className="text-xs text-red-500">
                            チーム戦?
                          </p>
                        }
                        {schedule.is_judge &&
                          <p className="text-xs text-green-500">
                            ジャッジ
                          </p>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}

export default ScheduleTable
