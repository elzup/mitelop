import styled from 'styled-components'
import SizeDef from '../SizeDef'

type Props = {}

function PianoAtom({}: Props) {
  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style>
        <div className="outer">
          <div className="inner">Piano init</div>
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .outer {
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;

    .inner {
      max-width: var(--w);
      max-height: var(--h);
      text-align: center;
    }
  }
`

export default PianoAtom
