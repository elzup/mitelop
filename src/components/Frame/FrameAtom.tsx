import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { FrameGadgetConfig } from '../../types'
import { FRAME_RATIOS } from './frameConfig'

type Props = { config: FrameGadgetConfig }

type BoxSize = { w: string; h: string }

const computeSize = (
  ratio: FrameGadgetConfig['ratio'],
  width: number,
  height: number
): BoxSize => {
  if (ratio === 'free' || width === 0 || height === 0) {
    return { w: '100%', h: '100%' }
  }
  const [rw, rh] = FRAME_RATIOS[ratio]
  const ar = rw / rh
  let w = width
  let h = width / ar

  if (h > height) {
    h = height
    w = height * ar
  }

  return { w: `${Math.floor(w)}px`, h: `${Math.floor(h)}px` }
}

function FrameAtom({ config }: Props) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const { ratio, label, borderColor, borderWidth, filled, bgColor, rounded } =
    config
  const size = computeSize(ratio, width, height)

  return (
    <Outer ref={ref}>
      <div
        className="frame"
        style={{
          width: size.w,
          height: size.h,
          border: `${borderWidth}px solid ${borderColor}`,
          background: filled ? bgColor : 'transparent',
          borderRadius: rounded ? '8px' : 0,
        }}
      >
        {label !== '' && (
          <span className="label" style={{ background: borderColor }}>
            {label}
          </span>
        )}
      </div>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;

  .frame {
    position: relative;
    box-sizing: border-box;
  }
  .label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1px 6px;
    font-size: 12px;
    color: #000;
    border-bottom-right-radius: 4px;
  }
`

export default FrameAtom
