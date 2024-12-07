import dayjs from "dayjs"
import localeObject from "dayjs/locale/en.js"
import relativeTime from "dayjs/plugin/relativeTime.js"
import updateLocale from "dayjs/plugin/updateLocale.js"

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.locale(localeObject)

const humanice = (d: string) => {
  const date = dayjs(d)
  const now = dayjs()
  const diference = now.diff(date, "month")

  if (diference >= 12) {
    return date.format("MMMM D, YYYY")
  } else if (diference >= 1) {
    return date.format("MMMM D")
  } else if (diference < 1) {
    return date.fromNow()
  }
}

export default humanice
