import styled from 'styled-components'

import { useLocalStorage } from 'react-use'

type Props = {
  titles: string[]
  row: boolean
}
function Table({ titles, row }: Props) {
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>(
    'titles',
    {}
  )

  return (
    <Style row={row}>
      <ul>
        {titles.map((title, i) => (
          <li
            key={i}
            onClick={() => setChecks(v => ({ ...v, [title]: !v[title] }))}
            data-checked={checks[title]}
          >
            <div>
              <span>{title}</span>
            </div>
          </li>
        ))}
      </ul>
    </Style>
  )
}

const Style = styled.div<{ row: boolean }>`
  height: 100vh;
  width: 100vw;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: grid;
  }
  li {
    font-size: 30px;
    border: solid 1px #444;
    &[data-checked='true'] {
      background: green;
    }
  }
`

export default Table
