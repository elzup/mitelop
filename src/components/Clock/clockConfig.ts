import { ClockConfig, GadgetLayout } from '../../types'
import { THEME_BG, THEME_FG } from '../../utils/themes'

/** Clock の表示レイアウト。推奨アス比 (width/height) つき。 */
export const CLOCK_LAYOUTS: GadgetLayout[] = [
  { id: 'stack', name: '日付+時刻', aspect: [1.0, 2.2] },
  { id: 'time', name: '時刻のみ大', aspect: [1.2, 3.2] },
  { id: 'row', name: '横並び', aspect: [2.4, 5.0] },
]

export const clockDefaultConfig: ClockConfig = {
  dateVisible: true,
  bgColor: THEME_BG,
  fontColor: THEME_FG,
  timeZone: '',
  layout: 'stack',
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
