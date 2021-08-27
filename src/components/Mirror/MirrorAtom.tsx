import { useRef } from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'
import { Icon } from '@material-ui/core'
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
        {allowed && <Webcam ref={webcamRef} mirrored={flipped} audio={false} />}
        {!allowed && (
          <div className="preview">
            <Icon>{'videocam'}</Icon>
            <button onClick={onAllowClick}>
              <span>Camera On</span>
            </button>
          </div>
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
  video {
    height: 100%;
    width: 100%;
  }
  &[data-fit='cover'] {
    video,
    .preview {
      object-fit: cover;
    }
  }
  &[data-fit='contain'] {
    video {
      object-fit: contain;
    }
    .preview {
    }
  }
  .preview {
    background: gray;
    width: 100%;
    height: 100%;
    display: grid;
    text-align: center;
    padding: calc(var(--h) * 0.1) calc(var(--w) * 0.1);
    .material-icons {
      color: white;
      width: 100%;
      font-size: calc(var(--w) * 0.4);
    }
  }
`

export default MirrorAtom
