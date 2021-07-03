import { Button } from '@material-ui/core'
import { useState } from 'react'
import { GeneratorFrame } from '..'
import { Size } from '../../types'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'

function MidokoroGenerator() {
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })

  return (
    <GeneratorFrame>
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
      </div>
    </GeneratorFrame>
  )
}

export default MidokoroGenerator
