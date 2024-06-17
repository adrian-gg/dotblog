import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js"
import updateLocale from "dayjs/plugin/updateLocale.js"
import localeObject from "dayjs/locale/en.js"

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.locale(localeObject)

const humanice = (date: string) => {
  const fecha = dayjs(date)
  const ahora = dayjs()
  const diferencia = ahora.diff(fecha, "month")
  
  if(diferencia >= 12) {
    return fecha.format('MMMM D, YYYY')

  }else if(diferencia >= 1) {
    return fecha.format('MMMM D')

  }else if(diferencia < 1) {
    return fecha.fromNow()
  }
}

export default humanice
