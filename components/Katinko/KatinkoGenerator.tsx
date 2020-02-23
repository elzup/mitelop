import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'

function KatinkoGenerator() {
  return (
    <Style>
      <Typography variant="h5">カチンコ</Typography>
      <Typography variant="caption">編集点を記録するウィジェット</Typography>
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
        <button>作成</button>
      </form>
    </Style>
  )
}

const Style = styled.div`
  form {
    display: grid;
    max-width: 400px;
  }
`

export default KatinkoGenerator
