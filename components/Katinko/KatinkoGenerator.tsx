import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import Katinko from '.'
import { Preview } from '..'

function KatinkoGenerator() {
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
              width: 300,
              height: 400,
            })
          }}
        >
          <button type="submit">作成</button>
        </form>
        <Preview>
          <Katinko />
        </Preview>
      </div>
    </Style>
  )
}

const Style = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    form {
      display: grid;
      max-width: 400px;
    }
  }
`

export default KatinkoGenerator
