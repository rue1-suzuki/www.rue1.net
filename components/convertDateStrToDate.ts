const convertDateStrToDate = (dateStr: string, timeStr?: string) => {
  const [year, month, day,] = dateStr.split("/").map(Number)

  if (timeStr) {
    const [hour, minute,] = timeStr.split(":").map(Number)
    return new Date(2000 + year, month - 1, day, hour, minute,)
  }

  return new Date(2000 + year, month - 1, day,)
}

export default convertDateStrToDate
