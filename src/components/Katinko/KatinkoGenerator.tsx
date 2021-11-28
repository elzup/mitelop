import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { isDev } from '@elzup/kit/lib/constants'
import { windowOpen } from '../../utils/browser'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

function KatinkoGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })

  return (
    <GeneratorFrame>
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
    </GeneratorFrame>
  )
}

export default KatinkoGenerator
