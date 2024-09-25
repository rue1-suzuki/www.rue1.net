"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import convertDateStrToDate from "./convertDateStrToDate"

interface FilterFormProps {
  schedules: ScheduleType[]
}

const FilterForm = (props: FilterFormProps) => {
  const { schedules } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedDate = useMemo(() => {
    return searchParams.get("date")
  }, [searchParams])

  const selectedLocation = useMemo(() => {
    return searchParams.get("location")
  }, [searchParams])

  const selectedFormat = useMemo(() => {
    return searchParams.get("format")
  }, [searchParams])

  const scheduleDateItems = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.date))).map((date) => {
      return {
        date: date,
        count: schedules.filter((schedule) => {
          if (schedule.date !== date)
            return false
          if (selectedLocation)
            if (schedule.location !== selectedLocation)
              return false
          if (selectedFormat)
            if (schedule.format !== selectedFormat)
              return false
          return true
        }).length
      }
    })
  }, [schedules, selectedLocation, selectedFormat,])

  const scheduleLocationItems = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.location))).sort().map((location) => {
      return {
        location: location,
        count: schedules.filter((schedule) => {
          if (schedule.location !== location)
            return false
          if (selectedDate)
            if (schedule.date !== selectedDate)
              return false
          if (selectedFormat)
            if (schedule.format !== selectedFormat)
              return false
          return true
        }).length
      }
    }).sort((a, b) => {
      if (a.count > b.count) return -1
      if (a.count < b.count) return 1
      return 0
    })
  }, [schedules, selectedDate, selectedFormat,])

  const scheduleFormatItems = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.format))).sort().map((format) => {
      return {
        format: format,
        count: schedules.filter((schedule) => {
          if (schedule.format !== format)
            return false
          if (selectedDate)
            if (schedule.date !== selectedDate)
              return false
          if (selectedLocation)
            if (schedule.location !== selectedLocation)
              return false
          return true
        }).length
      }
    }).sort((a, b) => {
      if (a.count > b.count) return -1
      if (a.count < b.count) return 1
      return 0
    })
  }, [schedules, selectedDate, selectedLocation,])

  const onChange = useCallback((changeEvent: React.ChangeEvent<HTMLSelectElement>) => {
    const key = changeEvent.target.name
    const value = changeEvent.target.value

    const params = new URLSearchParams(location.search)
    if (value)
      params.set(key, value)
    else
      params.delete(key)

    const url = new URL(pathname, location.origin)
    url.search = params.toString()

    router.push(url.href)
  }, [router, pathname,])

  return (
    <form className="max-w-md m-auto">
      <select className="w-full border rounded p-2 text-center" name="date" value={selectedDate ?? ""} onChange={onChange}>
        <option value=""> 開催日を選択 </option>
        {scheduleDateItems.map((item) => {
          if (item.count === 0)
            return null

          const value = convertDateStrToDate(item.date).toLocaleDateString("ja-JP", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })

          return (
            <option value={value} key={value}>
              {convertDateStrToDate(item.date).toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
              })} {item.count}件
            </option>
          )
        })}
      </select>
      <select className="w-full border rounded p-2 text-center" name="location" value={selectedLocation ?? ""} onChange={onChange}>
        <option value=""> 開催地を選択 </option>
        {scheduleLocationItems.map((item) => {
          return (
            <option value={item.location} key={item.location}>
              {item.location} {item.count}件
            </option>
          )
        })}
      </select>
      <select className="w-full border rounded p-2 text-center" name="format" value={selectedFormat ?? ""} onChange={onChange}>
        <option value=""> フォーマットを選択 </option>
        {scheduleFormatItems.map((item) => {
          return (
            <option value={item.format} key={item.format}>
              【{item.format}】 {item.count}件
            </option>
          )
        })}
      </select>
    </form>
  )
}

export default FilterForm
