import { useState } from 'react'

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

type IWindow = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition: any
  // webkitSpeechRecognition: WebkitSpeechRecognition
} & Window

// class WebkitSpeechRecognition {
//   volume: number
//   constructor() {
//     this.volume = 0
//   }
// }

export const iwindow = window as unknown as IWindow

export const displayModeMql = window.matchMedia('(display-mode: standalone)')
export const getIsStandalone = () => displayModeMql.matches

export const useKeyChanged = ({
  onChangedPress,
  onChangedRelease,
}: {
  onChangedPress?: (key: string) => void
  onChangedRelease?: (key: string) => void
}) => {
  const [pressed, setPressed] = useState<Record<string, boolean>>({})

  const onPress = (key: string) => {
    if (pressed[key]) return

    onChangedPress?.(key)
    setPressed((v) => ({ ...v, [key]: true }))
  }
  const onRelease = (key: string) => {
    if (!pressed[key]) return

    onChangedRelease?.(key)
    setPressed((v) => ({ ...v, [key]: false }))
  }

  return { onPress, onRelease }
}
