import * as React from 'react'
import { useMeasure } from 'react-use'

const SizeDef: React.FC = ({ children }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <div
      ref={ref}
      // @ts-ignore
      style={{ '--w': `${width}px`, '--h': `${height}px` }}
    >
      {children}
    </div>
  )
}

export default SizeDef
