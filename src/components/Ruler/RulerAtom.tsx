import styled from 'styled-components'
import SizeDef from '../SizeDef'

type Props = {}

function RulerAtom({}: Props) {
  return (
    <SizeDef>
      <Style></Style>
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  --bg: #2b0065;
  --fg: #ffffff;

  /* border: 0.4rem solid $dark; */
  background-color: var(--bg);
  background-image: linear-gradient(var(--fg) 1px, transparent 1px),
    linear-gradient(90deg, var(--fg) 1px, transparent 1px);
  background-size: 10px 10px;
  background-position: 0 0;
`

export default RulerAtom
