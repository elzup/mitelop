import { useState } from 'react'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { GadgetMode } from '../../types/index'

export function useConfig<T extends object>(id: string, initConfig: T) {
  const [mode, setMode] = useState<GadgetMode>('main')
  const [config, setConfig] = useLocalStorage<T>(`config-${id}`, initConfig)

  return { config, setConfig, mode, setMode }
}
