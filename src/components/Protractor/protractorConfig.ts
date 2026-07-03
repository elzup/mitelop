import { ProtractorConfig } from '../../types'

export const protractorDefaultConfig: ProtractorConfig = {
  shape: 'half',
  labelStep: 10,
  rotation: 0,
  color: '#1f4e9e',
  opacity: 0.12,
}

export const protractorAspectRatio = (config: ProtractorConfig) =>
  config.shape === 'half' ? 2 : 1
