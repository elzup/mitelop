import { useCallback, useMemo } from 'react'
import { pad02 } from '../../utils'

const timeToStr = (t: number): [string, string] => {
  const SEC = 1000
  const MIN = 60 * SEC
  const HOU = 60 * MIN
  const h = Math.floor(t / HOU)
  const m = Math.floor((t % HOU) / MIN)
  const s = Math.floor((t % MIN) / SEC)
  const milli = pad02(Math.floor((t % SEC) / 10))

  if (h > 0) return [`${h}:${pad02(m)}:${pad02(s)}`, milli]
  if (m > 0) return [`${m}:${pad02(s)}`, milli]
  return [`${s}`, milli]
}

export function useTimeStr(ts: number, ...dups: unknown[]) {
  return useMemo(() => timeToStr(ts), [ts, ...dups])
}
