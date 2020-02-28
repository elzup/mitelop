import styled from 'styled-components'
import { useState } from 'react'
import { Button } from '@material-ui/core'

type Status = 'on' | 'off'

function Katinko() {
  const [status, setStatus] = useState<Status>('off')
  const [clipping, setClipping] = useState<boolean>(false)

  return (
    <Style data-status={status} data-clipping={clipping}>
      <div
        className="panel"
        onClick={() => setStatus(v => (v === 'on' ? 'off' : 'on'))}
      >
        <div className="st">{status}</div>
        <div className="cl">{clipping}</div>
      </div>
      <div className="footer">
        <Button onClick={() => setStatus('on')}>ON</Button>
        <Button onClick={() => setStatus('off')}>OFF</Button>
        <Button
          onClick={() => {
            setClipping(true)
            setTimeout(() => {
              setClipping(false)
            }, 30 * 1000)
          }}
        >
          Clip(30秒)
        </Button>
      </div>
    </Style>
  )
}

const Style = styled.div`
  display: grid;
  grid-template-rows: 1fr max-content;
  height: 100vh;
  width: 100vw;
  &[data-status='off'] {
    background: green;
  }
  &[data-status='on'] {
    background: red;
  }
  &[data-clipping='true'] {
    .cl {
      background: orange;
    }
  }
  .panel {
    display: grid;
    grid-template-columns: 2fr 1fr;
    .st {
    }
    .cl {
    }
  }
  .footer {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    background: gray;
  }
`

export default Katinko
