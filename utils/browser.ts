type WindowOptions = {
  name?: string
  height?: number
  width?: number
}

export function windowOpen(
  url: string,
  { height, width, name = '_blank' }: WindowOptions
) {
  const options: string[] = []

  if (height) options.push(`height=${height}`)
  if (width) options.push(`width=${height}`)

  window.open(url, name, options.join(','))
}
