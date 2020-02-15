import { useState } from 'react'
import styled from 'styled-components'

type Props = {
  onSubmit: (titles: string[]) => void
}
function TableGenerator(props: Props) {
  const [titles, setTitles] = useState<string[]>([])

  return (
    <Style>
      <form
        onSubmit={e => {
          e.preventDefault()

          props.onSubmit(titles)
        }}
      >
        <label htmlFor="firstName">項目一覧(改行区切り)</label>
        <textarea
          id="firstName"
          name="firstName"
          onChange={e => setTitles(e.target.value.split('\n'))}
        />
        <button>作成</button>
      </form>
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
