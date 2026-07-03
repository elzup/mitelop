import { ClockConfig } from '../../types'

export const clockDefaultConfig: ClockConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
  timeZone: '',
}

/** 設定で選べる主要タイムゾーン (先頭は端末ローカル) */
export const CLOCK_TIMEZONES: { value: string; label: string }[] = [
  { value: '', label: '端末ローカル' },
  { value: 'Asia/Tokyo', label: '東京' },
  { value: 'Asia/Shanghai', label: '上海' },
  { value: 'Asia/Seoul', label: 'ソウル' },
  { value: 'Asia/Kolkata', label: 'インド' },
  { value: 'Europe/London', label: 'ロンドン' },
  { value: 'Europe/Paris', label: 'パリ' },
  { value: 'America/New_York', label: 'ニューヨーク' },
  { value: 'America/Chicago', label: 'シカゴ' },
  { value: 'America/Los_Angeles', label: 'ロサンゼルス' },
  { value: 'Australia/Sydney', label: 'シドニー' },
  { value: 'UTC', label: 'UTC' },
]
