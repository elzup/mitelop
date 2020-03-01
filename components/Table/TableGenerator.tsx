import { useLocalStorage } from 'react-use'
import { Typography, Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'
import { GeneratorFrame } from '..'

function TableGenerator() {
  const [titles, setTitles] = useLocalStorage<string[]>('titles-form', [])
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })
  const [size2, setSize2] = useState<Size>({ width: 750, height: 100 })
  const url = '/table?titles=' + titles.filter(v => v !== '').join(',')

  return (
    <GeneratorFrame>
      <Typography variant="h5">テーブル</Typography>
      <div>
        <div>
          <Typography gutterBottom>項目一覧(改行区切り)</Typography>
          <TextField
            value={titles.join('\n')}
            multiline
            onChange={e => setTitles(e.target.value.split('\n'))}
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
        <PreviewResizable
          url={url + '&row=1'}
          size={size2}
          onChangeSize={setSize2}
        />
      </div>
    </GeneratorFrame>
  )
}

export default TableGenerator
