import { ProtractorConfig } from '../../types'

export const protractorDefaultConfig: ProtractorConfig = {
  shape: 'full',
  labelStep: 30,
  rotation: 0,
  color: '#1f4e9e',
  opacity: 0.12,
}

// half/full とも正方 viewBox・中心回転にしたのでアス比は常に 1 (回しても枠外に出ない)
export const protractorAspectRatio = () => 1
