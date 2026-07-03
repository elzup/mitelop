import { CompassConfig } from '../../types'

export const compassDefaultConfig: CompassConfig = {
  rings: 3,
  crosshair: true,
  color: '#c2452d',
  lineWidth: 1.2,
}

/** 円ガイドなので枠は常に正方形 */
export const compassAspectRatio = () => 1
