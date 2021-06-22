export const getOne = (v: string | string[] | undefined): string => {
  if (!v) return ''
  return typeof v === 'object' ? v[0] : v
}
