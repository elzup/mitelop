import { Dispatch, SetStateAction, useState } from 'react'
import { GadgetMode } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { useSlotOverride } from './slotOverride'
import { useSlots } from './useSlots'

/**
 * standalone (単独ページ) 用: そのガジェットのアクティブスロットを config として読む。
 * 設定窓 (/config/<key>) と `config-active-<key>` / スロット本体を共有するので、
 * 別窓での編集・スロット切替がこのページに即反映される。
 * useConfig と同じ形 (config/setConfig/mode/setMode) を返す。
 */
export function useActiveSlot<T extends object>(
  key: string,
  defaultConfig: T,
  legacyId?: string
) {
  const [mode, setMode] = useState<GadgetMode>('main')
  const slots = useSlots<T>(key, defaultConfig, legacyId)
  const override = useSlotOverride()
  const [activeId] = useLocalStorage<string | null>(
    `config-active-${key}`,
    null
  )
  // 単体インスタンス窓は override スロットに束縛。無ければ従来の active スロット
  const id =
    override && slots.slots[override]
      ? override
      : activeId && slots.slots[activeId]
      ? activeId
      : slots.firstId
  const config = slots.getSlot(id).config
  const setConfig: Dispatch<SetStateAction<T>> = (u) =>
    slots.setSlotConfig(id, u)

  return { config, setConfig, mode, setMode }
}
