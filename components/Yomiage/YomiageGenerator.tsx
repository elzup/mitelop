import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

console.log({ isDev })

function YomiageGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })

  return (
    <GeneratorFrame>
      <Typography variant="h5">読み上げ</Typography>
      <Typography variant="caption">
        文字起こしと合成音声読み上げをする
      </Typography>
      <div>
        <div>
          <Button
            onClick={() => {
              windowOpen('/yomiage', {
                name: isDev ? 'replace' : '_blank',
                ...size,
              })
            }}
          >
            作成
          </Button>
        </div>
        <PreviewResizable url="/yomiage" size={size} onChangeSize={setSize} />
      </div>
    </GeneratorFrame>
  )
}

export default YomiageGenerator
