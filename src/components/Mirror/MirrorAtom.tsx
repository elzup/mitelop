import { useRef } from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'
import SizeDef from '../SizeDef'

type Props = {
  flipped: boolean
  allowed: boolean
  fit: string
  onAllowClick: () => void
}

function MirrorAtom({ fit, flipped, allowed, onAllowClick }: Props) {
  const webcamRef = useRef<Webcam>(null)

  return (
    <SizeDef>
      <Style data-fit={fit}>
        {!allowed && <button onClick={onAllowClick}>Camera On</button>}
        {allowed && <Webcam ref={webcamRef} mirrored={flipped} audio={false} />}
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  video {
    height: 100%;
    width: 100%;
  }
  &[data-fit='cover'] {
    video {
      object-fit: cover;
    }
  }
  &[data-fit='contain'] {
    video {
      object-fit: contain;
    }
  }
`

export default MirrorAtom
