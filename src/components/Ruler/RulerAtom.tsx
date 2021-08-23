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

  --bg: #ffffff;
  --fg: #2b0065;

  /* border: 0.4rem solid $dark; */
  background-color: var(--bg);
  background-image: repeating-linear-gradient(
      var(--fg),
      transparent 1px,
      transparent 10px
    ),
    repeating-linear-gradient(
      var(--fg),
      var(--fg) 1px,
      transparent 2px,
      transparent 50px
    ),
    repeating-linear-gradient(
      var(--fg),
      var(--fg) 2px,
      transparent 3px,
      transparent 100px
    ),
    repeating-linear-gradient(
      to right,
      var(--fg),
      transparent 1px,
      transparent 10px
    ),
    repeating-linear-gradient(
      to right,
      var(--fg),
      var(--fg) 1px,
      transparent 2px,
      transparent 50px
    ),
    repeating-linear-gradient(
      to right,
      var(--fg),
      var(--fg) 2px,
      transparent 3px,
      transparent 100px
    );
  background-position: 0 0;
`

export default RulerAtom
