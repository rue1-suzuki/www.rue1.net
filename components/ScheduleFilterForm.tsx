"use client"
import convertDateStrToDate from "@/components/convertDateStrToDate"
import FullCover from "@/parts/FullCover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useId, useMemo, useRef, useState } from "react"

interface FilterFormProps {
  schedules: ScheduleType[]
}

const ScheduleFilterForm = (props: FilterFormProps) => {
  const { schedules } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [disabled, setDisabled] = useState<boolean>(false)

  const selectedDates = useMemo(() => searchParams.getAll("date"), [searchParams])
  const selectedLocations = useMemo(() => searchParams.getAll("location"), [searchParams])
  const selectedFormats = useMemo(() => searchParams.getAll("format"), [searchParams])

  const scheduleDateItems = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.date))).map((date) => {
      return {
        date: date,
        count: schedules.filter((schedule) => {
          if (schedule.date !== date)
            return false
          if (selectedLocations.length > 0)
            if (!selectedLocations.includes(schedule.location))
              return false
          if (selectedFormats.length > 0)
            if (!selectedFormats.includes(schedule.format))
              return false
          return true
        }).length
      }
    })
  }, [schedules, selectedLocations, selectedFormats,])

  const scheduleLocationItems = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.location))).sort().map((location) => {
      return {
        location: location,
        count: schedules.filter((schedule) => {
          if (schedule.location !== location)
            return false
          if (selectedDates.length > 0)
            if (!selectedDates.includes(schedule.date))
              return false
          if (selectedFormats.length > 0)
            if (!selectedFormats.includes(schedule.format))
              return false
          return true
        }).length
      }
    }).sort((a, b) => {
      if (a.count > b.count) return -1
      if (a.count < b.count) return 1
      return 0
    })
  }, [schedules, selectedDates, selectedFormats,])

  const scheduleFormatItems = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.format))).sort().map((format) => {
      return {
        format: format,
        count: schedules.filter((schedule) => {
          if (schedule.format !== format)
            return false
          if (selectedDates.length > 0)
            if (!selectedDates.includes(schedule.date))
              return false
          if (selectedLocations.length > 0)
            if (!selectedLocations.includes(schedule.location))
              return false
          return true
        }).length
      }
    }).sort((a, b) => {
      if (a.count > b.count) return -1
      if (a.count < b.count) return 1
      return 0
    })
  }, [schedules, selectedDates, selectedLocations,])

  const onChange = useCallback(() => {
    if (!formRef.current)
      return alert("formRef.current is null")

    setDisabled(true)
    const params = new URLSearchParams()
    Array.from(formRef.current.elements).map((element) => {
      const input = element as HTMLInputElement
      if (input.type === "checkbox" && input.checked)
        params.append(input.name, input.value)
    })
    router.push(pathname + "?" + params.toString(), {
      scroll: false,
    })
    setDisabled(false)
  }, [router, pathname,])

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <>
      {disabled &&
        <FullCover>
          <p> 遷移中 </p>
        </FullCover>
      }

      <form className="max-w-md m-auto flex flex-col gap-1" ref={formRef}>
        <details className="w-full m-auto border">
          <summary className="block bg-gray-300 p-2 text-lg font-bold text-center">
            日程で絞り込み
          </summary>
          <div className="bg-white p-2">
            <table className="w-full m-auto text-center">
              <thead>
                <tr className="border-y">
                  <th className="p-2 w-1/4"> 選択 </th>
                  <th className="p-2 w-2/4"> 日付 </th>
                  <th className="p-2 w-1/4"> 開催数 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleDateItems.map((item) => {
                  return (
                    <DateTr
                      item={item}
                      selectedDates={selectedDates}
                      onChange={onChange}
                      key={item.date}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </details>

        <details className="w-full m-auto border">
          <summary className="block bg-gray-300 p-2 text-lg font-bold text-center">
            開催地で絞り込み
          </summary>
          <div className="bg-white p-2">
            <table className="w-full m-auto text-center">
              <thead>
                <tr className="border-y">
                  <th className="p-2 w-1/4"> 選択 </th>
                  <th className="p-2 w-2/4"> 都道府県 </th>
                  <th className="p-2 w-1/4"> 開催数 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleLocationItems.map((item) => {
                  return (
                    <LocationTr
                      item={item}
                      selectedLocations={selectedLocations}
                      onChange={onChange}
                      key={item.location}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </details>

        <details className="w-full m-auto border">
          <summary className="block bg-gray-300 p-2 text-lg font-bold text-center">
            フォーマットで絞り込み
          </summary>
          <div className="bg-white p-2">
            <table className="w-full m-auto text-center">
              <thead>
                <tr className="border-y">
                  <th className="p-2 w-1/4"> 選択 </th>
                  <th className="p-2 w-2/4"> フォーマット </th>
                  <th className="p-2 w-1/4"> 開催数 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleFormatItems.map((item) => {
                  return (
                    <FormatTr
                      item={item}
                      selectedFormats={selectedFormats}
                      onChange={onChange}
                      key={item.format}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </details>
      </form>
    </>
  )
}

export default ScheduleFilterForm

interface DateTrProps {
  item: {
    date: string
    count: number
  }
  selectedDates: string[]
  onChange: () => void
}

const DateTr = (props: DateTrProps) => {
  const { item, selectedDates, onChange, } = props

  const id = useId()

  const value = convertDateStrToDate(item.date).toLocaleDateString("ja-JP", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <tr className="border-y">
      <td className="p-2">
        <input
          className="w-[1rem] h-[1rem]"
          type="checkbox"
          name="date"
          value={value}
          defaultChecked={selectedDates.includes(value)}
          onChange={onChange}
          id={id}
        />
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {convertDateStrToDate(item.date).toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short",
          })}
        </label>
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {item.count}件
        </label>
      </td>
    </tr>
  )
}

interface LocationTrProps {
  item: {
    location: string
    count: number
  }
  selectedLocations: string[]
  onChange: () => void
}

const LocationTr = (props: LocationTrProps) => {
  const { item, selectedLocations, onChange, } = props

  const id = useId()

  return (
    <tr className="border-y">
      <td className="p-2">
        <input
          className="w-[1rem] h-[1rem]"
          type="checkbox"
          name="location"
          value={item.location}
          defaultChecked={selectedLocations.includes(item.location)}
          onChange={onChange}
          id={id}
        />
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {item.location}
        </label>
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {item.count}件
        </label>
      </td>
    </tr>
  )
}

interface FormatTrProps {
  item: {
    format: string
    count: number
  }
  selectedFormats: string[]
  onChange: () => void
}

const FormatTr = (props: FormatTrProps) => {
  const { item, selectedFormats, onChange, } = props

  const id = useId()

  return (
    <tr className="border-y">
      <td className="p-2">
        <input
          className="w-[1rem] h-[1rem]"
          type="checkbox"
          name="format"
          value={item.format}
          defaultChecked={selectedFormats.includes(item.format)}
          onChange={onChange}
          id={id}
        />
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {item.format}
        </label>
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {item.count}件
        </label>
      </td>
    </tr>
  )
}
