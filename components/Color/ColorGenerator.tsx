import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

function ColorGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })
  const [color, setColor] = useState<string>('#ffffff')
  const url = `/color?color=${encodeURIComponent(color)}`

  return (
    <GeneratorFrame>
      <Typography variant="h5">単色パネル</Typography>
      <Typography variant="caption">無地単色のパネルを表示する</Typography>

      <div>
        <SketchPicker color={color} onChangeComplete={(c) => setColor(c.hex)} />
        <div>
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

export default ColorGenerator
