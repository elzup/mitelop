import { MouseEvent, useRef, useState } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { RulerConfigOrigin, RulerConfigUnit } from '../../types'
import SizeDef from '../SizeDef'

type Props = {
  unit: RulerConfigUnit
  origin: RulerConfigOrigin
  transparent: boolean
}

type Pos = { x: number; y: number; w: number; h: number }

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

function RulerAtom({ unit, origin, transparent }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<Pos | null>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current

    if (!el) return
    const r = el.getBoundingClientRect()

    setPos({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      w: r.width,
      h: r.height,
    })
  }

  // マウス位置から各辺までの距離を px / % で表す
  const fmt = (value: number, total: number) =>
    unit === '%'
      ? `${total ? Math.round((value / total) * 100) : 0}%`
      : `${Math.round(value)}px`

  return (
    <SizeDef>
      <Style ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos(null)}>
        <GridLines
          style={{ ...unitStyle[unit], ...originStyle[origin] }}
          data-origin={origin}
          data-transparent={transparent}
        />
        {pos && (
          <Cursor>
            <span className="line v" style={{ left: pos.x }} />
            <span className="line h" style={{ top: pos.y }} />
            <span className="lbl top" style={{ left: pos.x, top: 2 }}>
              {fmt(pos.y, pos.h)}
            </span>
            <span className="lbl bottom" style={{ left: pos.x, bottom: 2 }}>
              {fmt(pos.h - pos.y, pos.h)}
            </span>
            <span className="lbl left" style={{ top: pos.y, left: 2 }}>
              {fmt(pos.x, pos.w)}
            </span>
            <span className="lbl right" style={{ top: pos.y, right: 2 }}>
              {fmt(pos.w - pos.x, pos.w)}
            </span>
          </Cursor>
        )}
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const GridLines = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  --bg: #ffffff;
  --fg: #2b0065;

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

  /* 透過時は下地だけ透明にし、目盛り線 (--fg) は残す */
  &[data-transparent='true'] {
    --bg: transparent;
  }

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
  }
  &[data-origin='DR'] {
    background-position: 100% 100%;
  }
`

/** マウス位置の十字線と、4 辺からの距離ラベル */
const Cursor = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;

  .line {
    position: absolute;
    background: #e5007e;
  }
  .line.v {
    top: 0;
    bottom: 0;
    width: 1px;
  }
  .line.h {
    left: 0;
    right: 0;
    height: 1px;
  }
  .lbl {
    position: absolute;
    padding: 0 3px;
    font-size: 10px;
    line-height: 14px;
    color: #fff;
    background: rgba(229, 0, 126, 0.85);
    border-radius: 2px;
    white-space: nowrap;
    transform: translate(-50%, 0);
  }
  .lbl.left,
  .lbl.right {
    transform: translate(0, -50%);
  }
`

export default RulerAtom
