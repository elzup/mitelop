import { round } from '@elzup/kit/lib/format'

export const round4 = (v: number) => round(v, 4)

export const arrayToObj = (keys: string[]) => {
  const obj: Record<string, boolean> = {}

  keys.forEach((key) => {
    obj[key] = true
  })
  return obj
}

export const arrOmit = <T>(arr: T[], v: T): T[] => arr.filter((av) => av !== v)
export const arrToggle = <T>(arr: T[], v: T): T[] =>
  arr.includes(v) ? arrOmit(arr, v) : [...arr, v]
