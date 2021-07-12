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
