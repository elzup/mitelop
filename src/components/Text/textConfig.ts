import { TextGadgetConfig } from '../../types'
import { THEME_BG, THEME_FG } from '../../utils/themes'

export const genPresetId = () =>
  `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

export const textDefaultConfig: TextGadgetConfig = {
  rows: 1,
  cols: 1,
  presets: [{ id: 'p-default', label: 'プリセット1', cells: ['テロップ'] }],
  activeId: 'p-default',
  fontSize: 32,
  align: 'center',
  blockAlign: 'center',
  vAlign: 'middle',
  border: false,
  fullWidth: false,
  scroll: 'none',
  bgColor: THEME_BG,
  fontColor: THEME_FG,
}

export const activePreset = (config: TextGadgetConfig) => {
  const presets = config.presets ?? []

  return presets.find((p) => p.id === config.activeId) ?? presets[0]
}
