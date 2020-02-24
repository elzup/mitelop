import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useLocalStorage } from 'react-use'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import SizeForm from '../SizeForm'
import { Size } from '../../types'
import Katinko from '.'
import { Preview } from '..'

function KatinkoGenerator() {
  const [size, setSize] = useLocalStorage<Size>('katinko-form-size', {
    width: 400,
    height: 300,
  })

  return (
    <Style>
      <Typography variant="h5">カチンコ</Typography>
      <Typography variant="caption">編集点を記録するウィジェット</Typography>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            windowOpen('/katinko', {
              name: isDev ? 'replace' : '_blank',
              width: size.width,
              height: size.height,
            })
          }}
        >
          <SizeForm size={size} setSize={setSize} />
          <button type="submit">作成</button>
        </form>
        <iframe
          src="/katinko"
          style={{ width: size.width, height: size.height }}
        />
      </div>
    </Style>
  )
}

const Style = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    form {
      max-width: 400px;
    }
  }
`

export default KatinkoGenerator
