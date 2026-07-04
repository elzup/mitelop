import styled from 'styled-components'
import { ColorConfig } from '../../types'
import { useAppTheme } from '../hooks/useAppTheme'

type Props = { config: ColorConfig }

/** 単色ブロック。shape で clip-path を切り替え、外側は透過。 */
function ColorAtom({ config }: Props) {
  const { resolve } = useAppTheme()

  return (
    <Box
      data-shape={config.shape ?? 'fill'}
      style={{ background: resolve(config.color) }}
    />
  )
}

const Box = styled.div`
  width: 100%;
  height: 100%;

  &[data-shape='rounded'] {
    border-radius: 12%;
  }
  &[data-shape='circle'] {
    clip-path: circle(50%);
  }
  &[data-shape='diamond'] {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
  &[data-shape='triangle'] {
    clip-path: polygon(50% 2%, 98% 98%, 2% 98%);
  }
`

export default ColorAtom
