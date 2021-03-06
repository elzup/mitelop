export const pad02 = (v: number) => `${v}`.padStart(2, '0')
export const round4 = (v: number) => Math.round(v * 10000) / 10000

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
