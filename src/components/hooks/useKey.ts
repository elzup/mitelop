import { useReducer, useRef, useEffect } from 'react'
import { Handler } from 'react-use/lib/useKey'
import { useKeyRef } from 'rooks'
import { noop } from '@elzup/kit'

const mapReducer = (
  v: Record<string, boolean>,
  { key, down }: { key: string; down: boolean }
) => ({ ...v, [key]: down })

const allKeys = `qwertyuiop[]asdfghjkl;'zxcvbnm,./`.split('')

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
      if (e.type === 'keydown') {
        keydownAll(e)
        if (!downsRef.current[e.key]) keydown(e)
        set({ key: e.key, down: true })
      } else if (e.type === 'keyup') {
        if (downsRef.current[e.key]) keyup(e)
        set({ key: e.key, down: false })
      }
    },
    { eventTypes: ['keydown', 'keyup'] }
  )

  return { downs, ref }
}
