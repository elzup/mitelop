import styled from 'styled-components'
import { BroadcastBand as BandConfig } from '../../types'

type Props = {
  band: BandConfig
}

function BroadcastBand({ band }: Props) {
  if (!band.visible) return null
  const phrase = band.phrases[band.activeIndex] ?? ''

  if (phrase === '') return null

  return (
    <Style style={{ background: band.bgColor, color: band.fontColor }}>
      <span>{phrase}</span>
    </Style>
  )
}

const Style = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 8px 24px;
  font-size: 24px;
  font-weight: bold;
  pointer-events: none;
`

export default BroadcastBand
