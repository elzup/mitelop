import styled from 'styled-components'
import { useState } from 'react'
import { Button } from '@material-ui/core'

type Status = 'on' | 'off'

function Katinko() {
  const [status, setStatus] = useState<Status>('off')

  return (
    <Style data-status={status}>
      <div onClick={() => setStatus(v => (v === 'on' ? 'off' : 'on'))}>
        {status}
      </div>
      <div className="footer">
        <Button onClick={() => setStatus('on')}>ON</Button>
        <Button onClick={() => setStatus('off')}>OFF</Button>
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
    background: white;
    background: green;
  }
  &[data-status='on'] {
    background: red;
  }
  .footer {
    display: grid;
    grid-auto-flow: column;
    background: gray;
  }
`

export default Katinko
