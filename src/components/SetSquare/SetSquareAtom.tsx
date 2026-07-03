import styled from 'styled-components'
import { SetSquareConfig } from '../../types'

type Pt = [number, number]

/** 外形の相似縮小で内側の抜き穴を作る (実物の三角定規風) */
const shrink = (pts: Pt[], rate: number): Pt[] => {
  const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length
  const cy = pts.reduce((a, p) => a + p[1], 0) / pts.length

  return pts.map(([x, y]) => [cx + (x - cx) * rate, cy + (y - cy) * rate])
}

const toPath = (pts: Pt[]) => `M ${pts.map((p) => p.join(',')).join(' L ')} Z`

type Props = { config: SetSquareConfig }

function SetSquareAtom({ config }: Props) {
  const { variant, rotation, flipped, color, opacity } = config
  const w = variant === '45' ? 100 : 173
  const outer: Pt[] =
    variant === '45'
      ? [
          [2, 98],
          [98, 98],
          [2, 2],
        ]
      : [
          [2, 98],
          [171, 98],
          [2, 2],
        ]
  const inner = shrink(outer, 0.45)
  // 抜き穴は逆回りにして evenodd で抜く
  const d = `${toPath(outer)} ${toPath([...inner].reverse())}`

  return (
    <Style>
      <svg
        viewBox={`0 0 ${w} 100`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: `rotate(${rotation}deg) scaleX(${flipped ? -1 : 1})`,
        }}
      >
        <path
          d={d}
          fillRule="evenodd"
          fill={color}
          fillOpacity={opacity}
          stroke={color}
          strokeWidth={1.2}
        />
      </svg>
    </Style>
  )
}

const Style = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  svg {
    width: 100%;
    height: 100%;
    transform-origin: center center;
  }
`

export default SetSquareAtom
