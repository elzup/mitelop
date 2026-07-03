import { useSeconds } from 'use-seconds'

/** timeZone (IANA 名, 空文字 = 端末ローカル) の現在時刻を dateStr / tStrs に整形して返す。 */
export function useClockTime(timeZone: string) {
  const [localeTime] = useSeconds()
  const fmt = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    ...(timeZone ? { timeZone } : {}),
  })
  const parts = fmt.formatToParts(localeTime)
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? '00'

  return {
    dateStr: `${get('year')}-${get('month')}-${get('day')}`,
    tStrs: [get('hour'), get('minute'), get('second')],
  }
}
