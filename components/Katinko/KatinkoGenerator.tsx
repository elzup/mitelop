import styled from 'styled-components'
import { Typography, Button } from '@material-ui/core'
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
        <div>
          <Button
            onClick={() => {
              windowOpen('/katinko', {
                name: isDev ? 'replace' : '_blank',
                ...size,
              })
            }}
          >
            作成
          </Button>
        </div>
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
