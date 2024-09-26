import convertDateStrToDate from "@/components/convertDateStrToDate"

const schedulesCompareFn = (a: ScheduleType, b: ScheduleType,) => {
  const startAtA = convertDateStrToDate(a.date, a.start)
  const startAtB = convertDateStrToDate(b.date, b.start)

  // 開始日時
  if (startAtA < startAtB) return -1
  if (startAtA > startAtB) return 1

  // 規模
  if (a.capacity > b.capacity) return -1
  if (a.capacity < b.capacity) return 1

  return 0
}

export default schedulesCompareFn
