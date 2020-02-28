import styled from 'styled-components'
import { useLocalStorage } from 'react-use'
import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import PreviewResizable from '../PreviewResizable'

function TableGenerator() {
  const [titles, setTitles] = useLocalStorage<string[]>('titles-form', [])
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })
  const url = '/table?titles=' + titles.join(',')

  return (
    <Style>
      <Typography variant="h5">テーブル</Typography>
      <div>
        <div>
          <Typography gutterBottom>項目一覧(改行区切り)</Typography>
          <textarea
            name="titles"
            style={{ width: '100%' }}
            value={titles.join('\n')}
            onChange={e => setTitles(e.target.value.split('\n'))}
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
      </div>
    </Style>
  )
}

const Style = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    > div {
      max-width: 400px;
    }
  }
`

export default TableGenerator
