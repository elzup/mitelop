/** ランチャーでガジェットを機能ごとにまとめる。ここに無い key は「その他」に集約する */
export type GadgetGroupKey =
  | 'measure'
  | 'time'
  | 'display'
  | 'video'
  | 'broadcast'
  | 'other'

export const GADGET_GROUPS: {
  key: GadgetGroupKey
  label: string
  gadgetKeys: string[]
}[] = [
  {
    key: 'measure',
    label: '計測',
    gadgetKeys: ['gad-ruler', 'gad-compass', 'gad-protractor'],
  },
  {
    key: 'time',
    label: '時間',
    gadgetKeys: ['gad-clock', 'gad-stopwatch', 'gad-timer', 'gad-interval'],
  },
  {
    key: 'display',
    label: '表示',
    gadgetKeys: ['gad-text', 'gad-color', 'gad-frame', 'gad-thumbnail'],
  },
  {
    key: 'video',
    label: '映像',
    gadgetKeys: ['gad-mirror', 'gad-katinko', 'gad-piano'],
  },
  {
    key: 'broadcast',
    label: '配信補助',
    gadgetKeys: ['gad-checks', 'gad-midokoro', 'gad-parrot', 'gad-counter'],
  },
]
