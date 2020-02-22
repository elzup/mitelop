type WindowOptions = {
  name?: string
  height?: number
  width?: number
}

export function windowOpen(
  url: string,
  { height, width, name = '_blank' }: WindowOptions
) {
  const option =
    (height ? `height=${height}` : '') + (width ? `width=${width}` : '')

  window.open(url, name, option)
}
