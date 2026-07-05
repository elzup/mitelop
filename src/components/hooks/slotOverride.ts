import { createContext, useContext } from 'react'

/**
 * 単体ガジェット窓が「この slotId を使え」と standalone Tool に伝える上書き。
 * null なら通常どおり active スロットを使う。複数インスタンス窓を独立させるための土台。
 */
export const SlotOverrideContext = createContext<string | null>(null)

export const useSlotOverride = () => useContext(SlotOverrideContext)
