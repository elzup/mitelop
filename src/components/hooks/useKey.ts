import { useReducer } from 'react'
import { useKey } from 'react-use'
import { Handler } from 'react-use/lib/useKey'
import { noop } from '../../utils'

const nonFilter = () => true
const mapReducer = (
  v: Record<string, boolean>,
  { key, down }: { key: string; down: boolean }
) => ({ ...v, [key]: down })

export const useKeyPressAll = (
  keydown: Handler,
  keyup: Handler = noop,
  keydownAll: Handler = noop
) => {
  const [downs, set] = useReducer(mapReducer, {} as Record<string, boolean>)

  useKey(
    nonFilter,
    (e) => {
      keydownAll(e)
      if (!downs[e.key]) keydown(e)
      set({ key: e.key, down: true })
    },
    { event: 'keydown' }
  )
  useKey(
    nonFilter,
    (e) => {
      if (downs[e.key]) keyup(e)
      set({ key: e.key, down: false })
    },
    { event: 'keyup' }
  )
  return { downs }
}
