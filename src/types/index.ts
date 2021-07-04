export type Size = { width: number; height: number }

export type ClockConfig = {
  dateVisible: boolean
  bgColor: string
  fontColor: string
}
export type GadgetMode = 'main' | 'conf'

export type MidokoroConfig = {}
export type MidokoroPlot = {
  id: string
  rate: number
  label: string
}
