import styled from 'styled-components'
import { ProtractorConfig } from '../../types'

const R = 95
const CX = 100

type Props = { config: ProtractorConfig }

/** 度数目盛りつきの分度器。half は上半円 (基線が下)、full は全円。 */
function ProtractorAtom({ config }: Props) {
  const { shape, labelStep, rotation, color, opacity } = config
  const isHalf = shape === 'half'
  // 回転で枠外に消えないよう、half/full とも中心(100,100)・正方 viewBox で描く
  const cy = 100
  const maxDeg = isHalf ? 180 : 360
  const vb = '0 0 200 200'

  // svg 座標: 0° = 右 (東)、反時計回りに増える (分度器の慣習)
  const pt = (deg: number, r: number): [number, number] => {
    const rad = (deg * Math.PI) / 180

    return [CX + r * Math.cos(rad), cy - r * Math.sin(rad)]
  }

  const ticks: { deg: number; len: number }[] = []

  for (let deg = 0; deg <= maxDeg - (isHalf ? 0 : 1); deg += 5) {
    ticks.push({ deg, len: deg % 10 === 0 ? 12 : 6 })
  }

  const labels = ticks
    .filter(({ deg }) => labelStep > 0 && deg % labelStep === 0)
    .map(({ deg }) => ({ deg, pos: pt(deg, R - 24) }))

  const outline = isHalf
    ? `M ${CX - R},${cy} A ${R},${R} 0 0,1 ${CX + R},${cy} Z`
    : undefined

  // 中心を通る分割線。0-180 / 90-270 (=90°刻みの軸) は必ず、30°刻みで細かくも引く
  const spokeStep = 30
  const spokes: number[] = []

  for (let deg = 0; deg <= maxDeg; deg += spokeStep) {
    if (!isHalf && deg === 360) continue
    spokes.push(deg)
  }

  return (
    <Style>
      <svg viewBox={vb} preserveAspectRatio="xMidYMid meet">
        <g transform={`rotate(${-rotation} ${CX} ${cy})`}>
          {isHalf ? (
            <path
              d={outline}
              fill={color}
              fillOpacity={opacity}
              stroke={color}
              strokeWidth={1.2}
            />
          ) : (
            <circle
              cx={CX}
              cy={cy}
              r={R}
              fill={color}
              fillOpacity={opacity}
              stroke={color}
              strokeWidth={1.2}
            />
          )}
          {spokes.map((deg) => {
            const [x, y] = pt(deg, R)
            const isAxis = deg % 90 === 0

            return (
              <line
                key={`spoke-${deg}`}
                x1={CX}
                y1={cy}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={isAxis ? 0.7 : 0.4}
                strokeOpacity={isAxis ? 0.6 : 0.3}
              />
            )
          })}
          {ticks.map(({ deg, len }) => {
            const [x1, y1] = pt(deg, R)
            const [x2, y2] = pt(deg, R - len)

            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={deg % 10 === 0 ? 0.9 : 0.5}
              />
            )
          })}
          {labels.map(({ deg, pos: [x, y] }) => (
            <text
              key={deg}
              x={x}
              y={y}
              fontSize={7}
              fill={color}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${90 - deg} ${x} ${y})`}
            >
              {deg}
            </text>
          ))}
          <circle cx={CX} cy={cy} r={1.2} fill={color} />
        </g>
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
  }
`

export default ProtractorAtom
