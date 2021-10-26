import { useReducer, useRef, useEffect } from 'react'
import { Handler } from 'react-use/lib/useKey'
import { useKeyRef } from 'rooks'
import { noop } from '../../utils'

const mapReducer = (
  v: Record<string, boolean>,
  { key, down }: { key: string; down: boolean }
) => ({ ...v, [key]: down })

const allKeys = `qwrtyuiop[]asdfghjkl;'zxcvbnm,./`.split('')

export const useKeyPressAll = (
  keydown: Handler,
  keyup: Handler = noop,
  keydownAll: Handler = noop
) => {
  const [downs, set] = useReducer(mapReducer, {} as Record<string, boolean>)
  const downsRef = useRef(downs)

  useEffect(() => {
    downsRef.current = downs
  }, [downs])

  const ref = useKeyRef(
    allKeys,
    (e) => {
      console.log(e)
      console.log(e.detail)
      console.log('down')
      console.log(downsRef.current)
      keydownAll(e)

      if (!downsRef.current[e.key]) keydown(e)
      set({ key: e.key, down: true })

      console.log('up')
      console.log(downsRef.current)

      if (downsRef.current[e.key]) keyup(e)
      set({ key: e.key, down: false })
    },
    { eventTypes: ['keydown', 'keyup'] }
  )

  return { downs, ref }
}
