import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

function ClockGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })

  return (
    <GeneratorFrame>
      <Typography variant="h5">タイマー</Typography>
      <Typography variant="caption">時刻を表示する</Typography>
      <div>
        <div>
          <Button
            onClick={() => {
              windowOpen('/clock', {
                name: isDev ? 'replace' : '_blank',
                ...size,
              })
            }}
          >
            作成
          </Button>
        </div>
        <PreviewResizable url="/clock" size={size} onChangeSize={setSize} />
      </div>
    </GeneratorFrame>
  )
}

export default ClockGenerator
