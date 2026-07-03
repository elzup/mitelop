import { Note as ToneNote } from 'tone/build/esm/core/type/NoteUnits'

export type Frequency = ToneNote
export type Size = { width: number; height: number }

export type ClockConfig = {
  dateVisible: boolean
  bgColor: string
  fontColor: string
  diffMinutes: number
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

export type IntervalStepBase = { name: string; sec: number }
export type IntervalStep = {
  name: string
  sec: number
  active: boolean
  par: number
  pos: number
}
export type IntervalConfig = {
  steps: IntervalStepBase[]
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
  fontSize: number
}

export type MirrorConfig = {
  flipped: boolean
  fit: 'contain' | 'cover'
}

export const RULER_UNITS = ['px', '%']
export const RULER_ORIGINS = ['UL', 'UR', 'DL', 'DR', 'center']
export type RulerConfigUnit = (typeof RULER_UNITS)[number]
export type RulerConfigOrigin = (typeof RULER_ORIGINS)[number]
export type RulerConfig = {
  unit: RulerConfigUnit
  origin: RulerConfigOrigin
  /** 背景を透過にする (オーバーレイ用途) */
  transparent: boolean
}

export type PianoConfig = {}

export type CompassConfig = {
  /** 同心円の本数 */
  rings: number
  crosshair: boolean
  color: string
  lineWidth: number
}

export type ProtractorShape = 'half' | 'full'
export type ProtractorConfig = {
  shape: ProtractorShape
  /** 度数ラベルの刻み (deg) */
  labelStep: number
  /** 回転 (deg) */
  rotation: number
  color: string
  /** 塗りの不透明度 0-1 */
  opacity: number
}

export type BroadcastItem = {
  id: string
  gadgetKey: string
  x: number
  y: number
  width: number
  height: number
  /** リサイズ時にアス比を固定する */
  lockAspect?: boolean
  /** 自動サイズ (SizeDef 系) gadget の文字スケール倍率。既定 1 */
  fontScale?: number
  /** 参照する設定スロット (config-slots-<gadgetKey>) の id。未設定なら先頭スロット */
  slotId?: string
}

export type BroadcastConfig = {
  items: BroadcastItem[]
}

/** stage (配信枠) のアス比プリセット。window に対して contain 表示する。 */
export const BROADCAST_RATIOS = [
  '16:9',
  '9:16',
  '4:3',
  '3:2',
  '1:1',
  '21:9',
] as const
export type BroadcastRatio = (typeof BROADCAST_RATIOS)[number]

export type BroadcastFrameConfig = {
  ratio: BroadcastRatio
  /** 比率の誤操作防止ロック */
  locked: boolean
}

export type FrameRatio =
  | '16:9'
  | '4:3'
  | '1:1'
  | '3:2'
  | '9:16'
  | '21:9'
  | 'free'

/** アス比ガイド枠 gadget。カメラやキャプチャの配置ガイドに使う。 */
export type FrameGadgetConfig = {
  ratio: FrameRatio
  label: string
  borderColor: string
  borderWidth: number
  filled: boolean
  bgColor: string
  rounded: boolean
}

export type TextAlign = 'left' | 'center' | 'right'
export type TextVAlign = 'top' | 'middle' | 'bottom'
export type TextScroll = 'none' | 'vertical' | 'marquee'

/** テロップの 1 プリセット (行×列のセル内容)。 */
export type TextPreset = {
  id: string
  label: string
  cells: string[]
}

/**
 * 表ベースのテキスト/テロップ gadget。全幅で下に置けば lower-third になる。
 * presets に複数のテキストを持ち、activeId のものを表示する (OBS のテロップ切替相当)。
 */
export type TextGadgetConfig = {
  rows: number
  cols: number
  presets: TextPreset[]
  activeId: string
  fontSize: number
  /** セル内テキストの揃え */
  align: TextAlign
  /** 表(グリッド)ブロック自体の水平位置 */
  blockAlign: TextAlign
  /** 表(グリッド)ブロック自体の垂直位置 */
  vAlign: TextVAlign
  /** セル間に罫線を引くか */
  border: boolean
  /** 表を枠の横幅いっぱいに広げ、列を均等(1fr)配分するか */
  fullWidth: boolean
  scroll: TextScroll
  bgColor: string
  fontColor: string
}

export const THUMBNAIL_ANCHORS = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-center',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const
export type ThumbnailAnchor = (typeof THUMBNAIL_ANCHORS)[number]

/** サムネイル上の 1 テキストレイヤー (改行で複数行)。 */
export type ThumbnailTextLayer = {
  text: string
  fontSize: number
  color: string
  strokeColor: string
  strokeWidth: number
  bold: boolean
  anchor: ThumbnailAnchor
}

export type ThumbnailImageFit = 'cover' | 'contain'

/**
 * サムネイル作成ツールの設定。背景(色/画像) + 2 つのテキストレイヤーを
 * canvas に描画し PNG として書き出す。放送 gadget とは独立した制作ツール。
 */
export type ThumbnailConfig = {
  width: number
  height: number
  bgColor: string
  /** 背景画像 (data URL)。空文字なら無し。 */
  bgImage: string
  imageFit: ThumbnailImageFit
  title: ThumbnailTextLayer
  subtitle: ThumbnailTextLayer
}
