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

export const RULER_UNITS = ['px', '%']
export const RULER_ORIGINS = ['UL', 'UR', 'DL', 'DR', 'center']
export type RulerConfigUnit = typeof RULER_UNITS[number]
export type RulerConfigOrigin = typeof RULER_ORIGINS[number]
export type RulerConfig = {
  unit: RulerConfigUnit
  origin: RulerConfigOrigin
}

export type PianoConfig = {}
