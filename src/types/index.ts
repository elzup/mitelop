export type Size = { width: number; height: number }

export type ClockConfig = {
  dateVisible: boolean
  bgColor: string
  fontColor: string
}
export type GadgetMode = 'main' | 'over' | 'conf'

export type MidokoroConfig = {}
export type MidokoroPlot = {
  id: string
  rate: number
  label: string
}

export type TimerConfig = {
  total: number
}

export type ColorConfig = {
  color: string
}

export type ParrotConfig = {
  pitch: number
  rate: number
}

export type StopwatchConfig = {}

export type ChecksLayout = 'horizontal' | 'vertical'

export const isLayoutType = (v: string): v is ChecksLayout =>
  v === 'horizontal' || v === 'vertical'

export type ChecksConfig = {
  text: string
  checks: string[]
  layout: ChecksLayout
}

export type MirrorConfig = {
  flipped: boolean
  fit: 'contain' | 'cover'
}
