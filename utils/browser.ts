type WindowOptions = {
  name?: string
  height?: number
  width?: number
}

export function windowOpen(
  url: string,
  { height, width, name = '_blank' }: WindowOptions
) {
  const options: (string | false)[] = [
    height !== undefined && `height=${height}`,
    width !== undefined && `width=${width}`,
  ]

  window.open(url, name, options.filter(Boolean).join(','))
}
