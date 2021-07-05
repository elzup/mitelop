export const pad02 = (v: number) => `${v}`.padStart(2, '0')
export const round4 = (v: number) => Math.round(v * 10000) / 10000
