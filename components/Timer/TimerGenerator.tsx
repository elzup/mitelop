import { Typography, Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

function TimerGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 85 })
  const [total, setTotal] = useState<number>(10)
  const url = `/timer?total=${total * 1000}`

  return (
    <GeneratorFrame>
      <Typography variant="h5">タイマー</Typography>
      <Typography variant="caption">制限時間をつける</Typography>
      <div>
        <div>
          <TextField
            value={total}
            type="number"
            multiline
            onChange={(e) => setTotal(Number(e.target.value))}
            label={'時間(秒)'}
            fullWidth
          />
          <Button
            onClick={() => {
              windowOpen(url, {
                name: isDev ? 'replace' : '_blank',
                ...size,
              })
            }}
          >
            作成
          </Button>
        </div>
        <PreviewResizable url={url} size={size} onChangeSize={setSize} />
      </div>
    </GeneratorFrame>
  )
}

export default TimerGenerator
