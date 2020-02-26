import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'

function KatinkoGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })

  return (
    <Style>
      <Typography variant="h5">カチンコ</Typography>
      <Typography variant="caption">編集点を記録するウィジェット</Typography>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(size)

            windowOpen('/katinko', {
              name: isDev ? 'replace' : '_blank',
              width: size.width,
              height: size.height,
            })
          }}
        >
          <button type="submit">作成</button>
        </form>
        <PreviewResizable url="/katinko" size={size} onChangeSize={setSize} />
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
