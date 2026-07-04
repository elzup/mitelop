import { ProtractorConfig } from '../../types'
import { THEME_ACCENT } from '../../utils/themes'

export const protractorDefaultConfig: ProtractorConfig = {
  shape: 'full',
  labelStep: 30,
  rotation: 0,
  color: THEME_ACCENT,
  opacity: 0.12,
}

// half/full とも正方 viewBox・中心回転にしたのでアス比は常に 1 (回しても枠外に出ない)
export const protractorAspectRatio = () => 1
