import styled from 'styled-components'
import { useState } from 'react'

type Status = 'on' | 'off'

function Katinko() {
  const [status, setStatus] = useState<Status>('off')

  return (
    <Style data-status={status}>
      <button onClick={() => setStatus('on')}>ON</button>
      <button onClick={() => setStatus('off')}>OFF</button>
    </Style>
  )
}

const Style = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  button {
    min-height: 100px;
  }
  &[data-status='off'] {
    background: white;
    background: green;
  }
  &[data-status='on'] {
    background: red;
  }
`

export default Katinko
