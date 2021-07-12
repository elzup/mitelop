import styled from 'styled-components'
import * as React from 'react'
import { useMeasure } from 'react-use'

const SizeDefStyle = styled.div<{ height: number; width: number }>`
  --w: ${(p) => p.width}px;
  --h: ${(p) => p.height}px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

const SizeDef: React.FC = ({ children }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <SizeDefStyle ref={ref} height={height} width={width}>
      {children}
    </SizeDefStyle>
  )
}

export default SizeDef
