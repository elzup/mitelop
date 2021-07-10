import { Ref, useCallback } from 'react'

export const useCombinedRefs = <T extends unknown>(...refs: Ref<T>[]): Ref<T> =>
  useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function')
          return ref(element)

          // @ts-ignore
        ;(ref as unknown).current = element
      }),
    refs
  )
