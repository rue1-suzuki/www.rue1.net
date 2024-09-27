"use client"
import convertDateStrToDate from "@/components/convertDateStrToDate"
import schedulesCompareFn from "@/components/schedulesCompareFn"
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

  if (schedules.length === 0) {
    return (
      <div className="text-center">
        <p> 該当するイベントなし </p>
      </div>
    )
  }

  return (
    <table className="w-full text-center">
      <thead className="bg-gray-100">
        <tr className="border-y">
          <th className="w-1/5 p-2"> 開催地 </th>
          <th className="w-3/5 p-2"> 大会概要 </th>
          <th className="w-1/5 p-2"> 規模 </th>
        </tr>
      </thead>
      <tbody>
        {schedules.sort(schedulesCompareFn).map((schedule) => {
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
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "short",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p className="text-sm">
                  <a className="text-blue-500 underline" href={schedule.url} target="_blank" rel="noreferer">
                    {schedule.name}
                  </a>
                </p>
                <p className="text-sm">
                  【{schedule.format}】
                </p>
              </td>
              <td className="p-2">
                <p className="text-lg font-bold">
                  {schedule.capacity}名
                </p>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ScheduleTable
