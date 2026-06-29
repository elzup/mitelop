import { useState } from 'react'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { GadgetMode } from '../../types/index'

/**
 * gadget の設定を localStorage に保存する。
 * instanceId を渡すと種別ではなく配置インスタンスごとに分離できる
 * (例: Broadcast に同じ gadget を複数置く場合)。
 */
export function useConfig<T extends object>(
  id: string,
  initConfig: T,
  instanceId?: string
) {
  const [mode, setMode] = useState<GadgetMode>('main')
  const key = instanceId ? `${id}-${instanceId}` : id
  const [config, setConfig] = useLocalStorage<T>(`config-${key}`, initConfig)

  return { config, setConfig, mode, setMode }
}
