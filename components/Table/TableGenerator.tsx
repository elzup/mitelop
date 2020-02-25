import styled from 'styled-components'
import { useLocalStorage } from 'react-use'
import { Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { Resizable } from 're-resizable'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import { Preview } from '..'

function TableGenerator() {
  const [titles, setTitles] = useLocalStorage<string[]>('titles-form', [])
  const [size, setSize] = useState<Size>({ width: 400, height: 300 })
  const url = '/table?titles=' + titles.join(',')

  return (
    <Style>
      <Typography variant="h5">テーブル</Typography>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            windowOpen(url, {
              name: isDev ? 'replace' : '_blank',
              width: size.width,
              height: size.height,
            })
          }}
        >
          <Typography gutterBottom>項目一覧(改行区切り)</Typography>
          <textarea
            name="titles"
            style={{ width: '100%' }}
            value={titles.join('\n')}
            onChange={e => setTitles(e.target.value.split('\n'))}
          />
          <Button>作成</Button>
        </form>
        <Preview>
          <Resizable
            defaultSize={size}
            onResizeStop={(e, dr, ref, d) => {
              setSize(size => ({
                height: size.height + d.height,
                width: size.width + d.width,
              }))
            }}
          >
            <iframe src={url} />
          </Resizable>
        </Preview>
      </div>
    </Style>
  )
}

const Style = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    form {
      max-width: 400px;
    }
  }
`

export default TableGenerator
