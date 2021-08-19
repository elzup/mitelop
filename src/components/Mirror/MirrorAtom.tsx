import { useRef } from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'
import SizeDef from '../SizeDef'

type Props = {
  flipped: boolean
  allowed: boolean
  onAllowClick: () => void
}

function MirrorAtom({ flipped, allowed, onAllowClick }: Props) {
  const webcamRef = useRef<Webcam>(null)

  return (
    <SizeDef>
      <Style>
        {!allowed && <button onClick={onAllowClick}>Camera On</button>}
        {allowed && (
          <Webcam
            ref={webcamRef}
            mirrored={flipped}
            audio={false}
            style={{ width: '100%' }}
          />
        )}
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`

export default MirrorAtom
