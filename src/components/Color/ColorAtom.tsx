import styled from 'styled-components'
import { ColorConfig } from '../../types'

type Props = { config: ColorConfig }
function ColorAtom({ config }: Props) {
  return <Style style={{ background: config.color }}></Style>
}

const Style = styled.div`
  height: 100%;
  width: 100%;
`

export default ColorAtom
