import { ClockConfig } from '../../types'
import { offsetMinutes } from './useClockTime'

export const clockDefaultConfig: ClockConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
  diffMinutes: offsetMinutes,
}
