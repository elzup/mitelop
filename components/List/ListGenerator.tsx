import { Typography, Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'
import { useTitleLocalStorage } from '../../utils/useLocalStorage'

function ListGenerator() {
  const [titles, setTitles] = useTitleLocalStorage()
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })
  const [sizeR, setSizeR] = useState<Size>({ width: 750, height: 100 })
  const url = '/list?titles=' + titles.filter((v) => v !== '').join(',')
  const urlR = url + '&row=1'

  return (
    <GeneratorFrame>
      <Typography variant="h5">テーブル</Typography>
      <Typography variant="caption">タスクリスト・進捗リスト</Typography>
      <div>
        <div>
          <Typography gutterBottom>項目一覧(改行区切り)</Typography>
          <TextField
            value={titles.join('\n')}
            multiline
            onChange={(e) => setTitles(e.target.value.split('\n'))}
            fullWidth
          />
          <Button
            onClick={() => {
              windowOpen(url, { name: isDev ? 'replace' : '_blank', ...size })
            }}
          >
            作成
          </Button>
        </div>
        <PreviewResizable url={url} size={size} onChangeSize={setSize} />
        <div>
          <PreviewResizable url={urlR} size={sizeR} onChangeSize={setSizeR} />

          <Button
            onClick={() => {
              windowOpen(urlR, { name: isDev ? 'replace' : '_blank', ...sizeR })
            }}
          >
            作成
          </Button>
        </div>
      </div>
    </GeneratorFrame>
  )
}

export default ListGenerator
