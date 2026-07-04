import { GadgetLayout, IntervalConfig } from '../../types'

/** Interval の表示レイアウト。推奨アス比 (width/height) 範囲つき。 */
export const INTERVAL_LAYOUTS: GadgetLayout[] = [
  { id: 'bar', name: 'ステップ(横)', aspect: [2.5, 8] },
  { id: 'stack', name: 'ステップ(縦)', aspect: [0.5, 1.5] },
  { id: 'focus', name: '現ステップのみ', aspect: [1.2, 4] },
]

export const intervalDefaultConfig: IntervalConfig = {
  steps: [
    { name: 'A', sec: 5 },
    { name: 'B', sec: 10 },
    { name: 'C', sec: 15 },
  ],
  layout: 'bar',
}
