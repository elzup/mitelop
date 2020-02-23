import styled from 'styled-components'
import { useLocalStorage } from 'react-use'
import { Typography } from '@material-ui/core'
import { windowOpen } from '../../utils/browser'
import Table from '.'

function TableGenerator() {
  const [titles, setTitles] = useLocalStorage<string[]>('titles-form', [])

  return (
    <Style>
      <Typography variant="h5">テーブル</Typography>
      <form
        onSubmit={e => {
          e.preventDefault()
          windowOpen('/table?titles=' + titles.join(','), {
            name: '_blank',
            width: 400,
            height: 400,
          })
        }}
      >
        <label htmlFor="firstName">項目一覧(改行区切り)</label>
        <textarea
          id="firstName"
          name="firstName"
          value={titles.join('\n')}
          onChange={e => setTitles(e.target.value.split('\n'))}
        />
        <button>作成</button>
      </form>
      <Table titles={titles} />
    </Style>
  )
}

const Style = styled.div`
  form {
    display: grid;
    max-width: 400px;
  }
`

export default TableGenerator
