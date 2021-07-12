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

function calcRate(
  width: number,
  height: number,
  rRate?: number,
  pRate?: number
) {
  const maxWidth = pRate ? height * pRate : width
  const maxHeight = rRate ? width / rRate : height

  return [Math.min(width, maxWidth), Math.min(height, maxHeight)]
}

const SizeDef: React.FC<{ randRate?: number; portRate?: number }> = ({
  children,
  randRate,
  portRate,
}) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [w, h] = calcRate(width, height, randRate, portRate)

  return (
    <SizeDefStyle ref={ref} width={w} height={h}>
      {children}
    </SizeDefStyle>
  )
}

export default SizeDef
