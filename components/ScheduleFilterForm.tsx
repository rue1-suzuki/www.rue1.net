"use client"
import FullCover from "@/components/FullCover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useId, useMemo, useRef, useState } from "react"
import convertDateStrToDate from "./convertDateStrToDate"

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

    router.push(pathname + "?" + decodeURIComponent(params.toString()), {
      scroll: false,
    })
    setTimeout(() => {
      setDisabled(false)
    }, 300)
  }, [router, pathname,])

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <>
      {disabled &&
        <FullCover>
          <p> 絞り込み設定中 </p>
        </FullCover>
      }

      <form className="max-w-md m-auto flex flex-col gap-1" ref={formRef}>
        <details className="border m-1">
          <summary className="block bg-gray-300 p-2 text-lg font-bold text-center">
            日程で絞り込み
            <p className="text-sm text-gray-500">
              {selectedDates.length > 0
                ? <> 選択中: {selectedDates.length}件 </>
                : <> 選択なし </>
              }
            </p>
          </summary>
          <div className="bg-white max-h-[50dvh] overflow-y-auto m-1">
            <table className="w-full m-auto text-center">
              <thead className="sticky top-0 bg-gray-100">
                <tr className="border-y">
                  <th className="p-2 w-1/4"> 選択 </th>
                  <th className="p-2 w-2/4"> 日付 </th>
                  <th className="p-2 w-1/4"> 開催数 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleDateItems.map((item) => {
                  return (
                    <ScheduleTableTr
                      item={{
                        name: "date",
                        value: item.date,
                        label: convertDateStrToDate(item.date).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          weekday: "short",
                        }),
                        count: item.count,
                      }}
                      selectedValues={selectedDates}
                      onChange={onChange}
                      key={item.date}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </details>

        <details className="border m-1">
          <summary className="block bg-gray-300 p-2 text-lg font-bold text-center">
            開催地で絞り込み
            <p className="text-gray-500 text-sm">
              {selectedLocations.length > 0
                ? <> 選択中: {selectedLocations.length}件 </>
                : <> 選択なし </>
              }
            </p>
          </summary>
          <div className="bg-white max-h-[50dvh] overflow-y-auto m-1">
            <table className="w-full m-auto text-center">
              <thead className="sticky top-0 bg-gray-100">
                <tr className="border-y">
                  <th className="p-2 w-1/3"> 選択 </th>
                  <th className="p-2 w-1/3"> 都道府県 </th>
                  <th className="p-2 w-1/3"> 開催数 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleLocationItems.map((item) => {
                  return (
                    <ScheduleTableTr
                      item={{
                        name: "location",
                        value: item.location,
                        label: item.location,
                        count: item.count,
                      }}
                      selectedValues={selectedLocations}
                      onChange={onChange}
                      key={item.location}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </details>

        <details className="border m-1">
          <summary className="block bg-gray-300 p-2 text-lg font-bold text-center">
            フォーマットで絞り込み
            <p className="text-gray-500 text-sm">
              {selectedFormats.length > 0
                ? <> 選択中: {selectedFormats.length}件 </>
                : <> 選択なし </>
              }
            </p>
          </summary>
          <div className="bg-white max-h-[50dvh] overflow-y-auto m-1">
            <table className="w-full m-auto text-center">
              <thead className="sticky top-0 bg-gray-100">
                <tr className="border-y">
                  <th className="p-2 w-1/4"> 選択 </th>
                  <th className="p-2 w-2/4"> フォーマット </th>
                  <th className="p-2 w-1/4"> 開催数 </th>
                </tr>
              </thead>
              <tbody>
                {scheduleFormatItems.map((item) => {
                  return (
                    <ScheduleTableTr
                      item={{
                        name: "format",
                        value: item.format,
                        label: `【${item.format}】`,
                        count: item.count,
                      }}
                      selectedValues={selectedFormats}
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

interface ScheduleTableTrProps {
  item: {
    name: string
    value: string
    label: string
    count: number
  }
  selectedValues: string[]
  onChange: () => void
}

const ScheduleTableTr = (props: ScheduleTableTrProps) => {
  const { item, selectedValues, onChange, } = props

  const id = useId()

  return (
    <tr className={`border-y ${item.count > 0 ? "bg-blue-50 text-blue-500" : "text-gray-500"}`}>
      <td className="p-2">
        <input
          className="w-[1rem] h-[1rem]"
          type="checkbox"
          name={item.name}
          value={item.value}
          defaultChecked={selectedValues.includes(item.value)}
          onChange={onChange}
          id={id}
        />
      </td>
      <td className="p-2">
        <label className="block" htmlFor={id}>
          {item.label}
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
