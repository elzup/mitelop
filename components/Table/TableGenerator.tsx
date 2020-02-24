import styled from 'styled-components'
import { useLocalStorage } from 'react-use'
import { Typography, Button } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'
import { windowOpen } from '../../utils/browser'
import { isDev } from '../../utils/env'
import { Size } from '../../types'
import Table from '.'
import { Preview } from '..'

function TableGenerator() {
  const [titles, setTitles] = useLocalStorage<string[]>('titles-form', [])
  const [size, setSize] = useLocalStorage<Size>('table-form-size', {
    width: 400,
    height: 300,
  })

  return (
    <Style>
      <Typography variant="h5">テーブル</Typography>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            windowOpen('/table?titles=' + titles.join(','), {
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

          <Typography gutterBottom>ウィジェット幅: {size.width}</Typography>
          <Slider
            defaultValue={size.width}
            onChange={(e, width) => {
              if (typeof width === 'object') return
              setSize(size => ({ ...size, width }))
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={100}
            max={1000}
          />
          <Typography gutterBottom>ウィジェット高さ: {size.height}</Typography>
          <Slider
            defaultValue={size.height}
            onChange={(e, height) => {
              if (typeof height === 'object') return
              setSize(size => ({ ...size, height }))
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={100}
            max={1000}
          />
          <Button>作成</Button>
        </form>
        <Preview style={{ width: size.width, height: size.height }}>
          <Table titles={titles} />
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
