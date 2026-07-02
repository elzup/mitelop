import styled from 'styled-components'
import { ReactNode } from 'react'
import { useMeasure } from 'react-use'

const SizeDefStyle = styled.div<{ height: number; width: number }>`
  /* 祖先 (Broadcast フレーム等) が --font-scale を与えると文字基準が一括で伸縮する */
  --w: calc(${(p) => p.width}px * var(--font-scale, 1));
  --h: calc(${(p) => p.height}px * var(--font-scale, 1));
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

function calcRate(
  width: number,
  height: number,
  lRate?: number,
  pRate?: number
) {
  const maxWidth = pRate ? height * pRate : width
  const maxHeight = lRate ? width / lRate : height

  return [Math.min(width, maxWidth), Math.min(height, maxHeight)]
}

type SizeDefProps = {
  children: ReactNode
  landRate?: number
  portRate?: number
}

const SizeDef = ({ children, landRate, portRate }: SizeDefProps) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [w, h] = calcRate(width, height, landRate, portRate)

  return (
    <SizeDefStyle ref={ref} width={w} height={h}>
      {children}
    </SizeDefStyle>
  )
}

export default SizeDef
