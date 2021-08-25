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

const originStyle = {
  UL: { '--dir-h': 'right', '--dir-v': 'bottom' },
  UR: { '--dir-h': 'left', '--dir-v': 'bottom' },
  DL: { '--dir-h': 'right', '--dir-v': 'top' },
  DR: { '--dir-h': 'left', '--dir-v': 'top' },
  center: { '--dir-h': 'right', '--dir-v': 'bottom' },
} as Record<RulerConfigOrigin, CSSProperties>

function RulerAtom({ unit, origin }: Props) {
  return (
    <SizeDef>
      <Style
        style={{ ...unitStyle[unit], ...originStyle[origin] }}
        data-origin={origin}
      />
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
      to var(--dir-v),
      var(--fg),
      transparent 1px,
      transparent var(--w1)
    ),
    repeating-linear-gradient(
      to var(--dir-v),
      transparent,
      transparent calc(var(--w2) - 1px),
      var(--fg) var(--w2)
    ),
    repeating-linear-gradient(
      to var(--dir-v),
      var(--fg),
      var(--fg) 1px,
      transparent 2px,
      transparent calc(var(--w3) - 0px)
    ),
    repeating-linear-gradient(
      to var(--dir-h),
      var(--fg),
      transparent 1px,
      transparent var(--w1)
    ),
    repeating-linear-gradient(
      to var(--dir-h),
      transparent,
      transparent calc(var(--w2) - 1px),
      var(--fg) var(--w2)
    ),
    repeating-linear-gradient(
      to var(--dir-h),
      var(--fg),
      var(--fg) 1px,
      transparent 2px,
      transparent calc(var(--w3) - 0px)
    );

  &[data-origin='center'] {
    background-position: calc(var(--w) % var(--w3) / 2)
      calc(var(--h) % var(--w3) / 2);
  }
  &[data-origin='UL'] {
    background-position: 0 0;
  }
  &[data-origin='UR'] {
    background-position: 0 100%;
  }
  &[data-origin='DL'] {
    background-position: 100% 0;
    /* background-position: left 0 bottom calc(100% - var(--w3)); */
  }
  &[data-origin='DR'] {
    background-position: 100% 100%;
    /* background-position: right calc(100% - var(--w3)) bottom
      calc(100% - var(--w3)); */
  }
`

export default RulerAtom
