import { FrameGadgetConfig, FrameRatio } from '../../types'

export const frameDefaultConfig: FrameGadgetConfig = {
  ratio: '16:9',
  label: '',
  borderColor: '#ffffff',
  borderWidth: 2,
  filled: false,
  bgColor: '#000000',
  rounded: false,
}

export const FRAME_RATIOS: Record<
  Exclude<FrameRatio, 'free'>,
  [number, number]
> = {
  '16:9': [16, 9],
  '4:3': [4, 3],
  '1:1': [1, 1],
  '3:2': [3, 2],
  '9:16': [9, 16],
  '21:9': [21, 9],
}

export const FRAME_RATIO_OPTIONS: FrameRatio[] = [
  '16:9',
  '4:3',
  '1:1',
  '3:2',
  '9:16',
  '21:9',
  'free',
]

/** 固定アス比 (width/height)。free は固定しない。 */
export const frameAspectRatio = (
  config: FrameGadgetConfig
): number | undefined => {
  if (config.ratio === 'free') return undefined
  const [w, h] = FRAME_RATIOS[config.ratio]

  return w / h
}

/** 各アス比の代表的な入力映像 (補足説明) */
export const FRAME_RATIO_HINTS: Record<FrameRatio, string> = {
  '16:9': 'FHD/4K・Switch・PC・YouTube横',
  '4:3': '旧TV・レトロゲーム・資料',
  '1:1': '正方形・SNS投稿',
  '3:2': '一眼カメラ・Surface',
  '9:16': 'スマホ縦・Shorts/Reels/TikTok',
  '21:9': 'ウルトラワイド・シネスコ',
  free: '枠サイズに合わせて自由',
}
