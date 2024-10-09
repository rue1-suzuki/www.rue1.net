"use client"
import { useId } from "react"

const ScheduleTableTr = (props: {
  item: {
    name: string
    value: string
    label: string
    count: number
  }
  selectedValues: string[]
  onChange: () => void
}) => {
  const { item, selectedValues, onChange, } = props

  const htmlId = useId()

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
          id={htmlId}
        />
      </td>
      <td className="p-2">
        <label className="block w-full" htmlFor={htmlId}>
          {item.label}
        </label>
      </td>
      <td className="p-2">
        <label className="block w-full" htmlFor={htmlId}>
          {item.count}件
        </label>
      </td>
    </tr>
  )
}

export default ScheduleTableTr