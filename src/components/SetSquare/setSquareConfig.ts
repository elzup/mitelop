import { SetSquareConfig } from '../../types'

export const setSquareDefaultConfig: SetSquareConfig = {
  variant: '45',
  rotation: 0,
  flipped: false,
  color: '#2b8a6e',
  opacity: 0.25,
}

/** 枠のアス比を三角形の外形に合わせる (45: 正方形, 30-60: √3:1) */
export const setSquareAspectRatio = (config: SetSquareConfig) =>
  config.variant === '45' ? 1 : 1.73
