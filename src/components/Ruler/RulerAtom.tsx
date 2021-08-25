import styled, { CSSProperties } from 'styled-components'
import { RulerConfigOrigin, RulerConfigUnit } from '../../types'
import SizeDef from '../SizeDef'

type Props = {
  unit: RulerConfigUnit
  origin: RulerConfigOrigin
}

const unitParStyle = {
  '--w1': '1%',
  '--w2': '5%',
  '--w3': '10%',
} as CSSProperties

const unitPxStyle = {
  '--w1': '10px',
  '--w2': '50px',
  '--w3': '100px',
} as CSSProperties
const unitStyle: Record<RulerConfigUnit, CSSProperties> = {
  '%': unitParStyle,
  px: unitPxStyle,
}

function RulerAtom({ unit, origin }: Props) {
  return (
    <SizeDef>
      <Style style={{ ...unitStyle[unit] }} data-origin={origin} />
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  --bg: #ffffff;
  --fg: #2b0065;

  /* border: 0.4rem solid $dark; */
  background-color: var(--bg);
  background-image: repeating-linear-gradient(
      var(--fg),
      transparent 1px,
      transparent var(--w1)
    ),
    repeating-linear-gradient(
      var(--fg),
      var(--fg) 1px,
      transparent 2px,
      transparent var(--w2)
    ),
    repeating-linear-gradient(
      var(--fg),
      var(--fg) 2px,
      transparent 3px,
      transparent var(--w3)
    ),
    repeating-linear-gradient(red, red 4px, transparent 5px, transparent 1000px),
    repeating-linear-gradient(
      to right,
      var(--fg),
      transparent 1px,
      transparent var(--w1)
    ),
    repeating-linear-gradient(
      to right,
      var(--fg),
      var(--fg) 1px,
      transparent 2px,
      transparent var(--w2)
    ),
    repeating-linear-gradient(
      to right,
      var(--fg),
      var(--fg) 2px,
      transparent 3px,
      transparent var(--w3)
    );
  background-position: 0 0;
  &[data-origin='center'] {
    background-position: calc(var(--w) / 2) calc(var(--h) / 2);
  }
`

export default RulerAtom
