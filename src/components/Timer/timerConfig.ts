import { GadgetLayout, TimerConfig } from '../../types'

/** Timer の表示レイアウト。推奨アス比 (width/height) 範囲つき。 */
export const TIMER_LAYOUTS: GadgetLayout[] = [
  { id: 'bar', name: '時刻+バー(横)', aspect: [2.2, 6] },
  { id: 'plain', name: '時刻のみ', aspect: [1.4, 4] },
  { id: 'stack', name: '時刻+バー(縦)', aspect: [0.8, 2.2] },
]

export const timerDefaultConfig: TimerConfig = {
  mode: 'duration',
  total: 10,
  targetTime: '',
  layout: 'bar',
}
