import * as React from 'react'
import { useMeasure } from 'react-use'

const SizeDef: React.FC = ({ children }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{
        // @ts-ignore
        '--w': `${width}px`,
        '--h': `${height}px`,
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}

export default SizeDef
