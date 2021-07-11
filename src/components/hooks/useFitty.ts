import { useEffect, useRef } from 'react'
import fitty from 'fitty'

export function useFitty() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    fitty(ref.current)
    // ref.current.addEventListener('fit', (e) => {
    //   console.log(e)
    // })
  }, [ref.current])
  return [ref] as const
}
