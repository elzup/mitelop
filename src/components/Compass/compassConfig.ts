import { CompassConfig } from '../../types'
import { THEME_ACCENT } from '../../utils/themes'

export const compassDefaultConfig: CompassConfig = {
  rings: 3,
  crosshair: true,
  color: THEME_ACCENT,
  lineWidth: 1.2,
}

/** 円ガイドなので枠は常に正方形 */
export const compassAspectRatio = () => 1
