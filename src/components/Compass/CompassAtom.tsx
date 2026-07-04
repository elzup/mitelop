import styled from 'styled-components'
import { CompassConfig } from '../../types'
import { useAppTheme } from '../hooks/useAppTheme'

type Props = { config: CompassConfig }

/** 同心円 + 十字線の円ガイド。中心と半径の目安に使う。 */
function CompassAtom({ config }: Props) {
  const { resolve } = useAppTheme()
  const { rings, crosshair, lineWidth } = config
  const color = resolve(config.color)
  const R = 48
  const radii = Array.from(
    { length: Math.max(1, rings) },
    (_, i) => (R * (i + 1)) / Math.max(1, rings)
  )

  return (
    <Style>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {radii.map((r) => (
          <circle
            key={r}
            cx={50}
            cy={50}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={lineWidth}
          />
        ))}
        {crosshair && (
          <>
            <line
              x1={0}
              y1={50}
              x2={100}
              y2={50}
              stroke={color}
              strokeWidth={lineWidth * 0.6}
              strokeDasharray="3 2"
            />
            <line
              x1={50}
              y1={0}
              x2={50}
              y2={100}
              stroke={color}
              strokeWidth={lineWidth * 0.6}
              strokeDasharray="3 2"
            />
          </>
        )}
        <circle cx={50} cy={50} r={1.4} fill={color} />
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

export default CompassAtom
