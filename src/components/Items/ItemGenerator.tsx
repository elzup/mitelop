import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { isDev } from '@elzup/kit/lib/constants'
import { windowOpen } from '../../utils/browser'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

function ItemsGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })

  return (
    <GeneratorFrame>
      <Typography variant="h5">コンポーネンツ</Typography>
      <Typography variant="caption">その他小道具</Typography>
      <div>
        <Typography variant="h6">スライダー</Typography>
        <div>
          <Button
            onClick={() => {
              windowOpen('/comp/slider', {
                name: isDev ? 'replace' : '_blank',
                ...size,
              })
            }}
          >
            作成
          </Button>
        </div>
        <PreviewResizable
          url="/comp/slider"
          size={size}
          onChangeSize={setSize}
        />
      </div>
    </GeneratorFrame>
  )
}

export default ItemsGenerator
