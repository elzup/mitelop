import { useSeconds } from 'use-seconds'

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const toDateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2)

export const offsetMinutes = new Date().getTimezoneOffset() || -540

/** diffMinutes ぶんずらした現在時刻を dateStr / tStrs に整形して返す。 */
export function useClockTime(diffMinutes: number) {
  const [localeTime] = useSeconds()
  const time = new Date(+localeTime + (offsetMinutes - diffMinutes) * 1000 * 60)

  return { dateStr: toDateStr(time), tStrs: timeStr(time) }
}
