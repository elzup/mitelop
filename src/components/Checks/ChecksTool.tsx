import styled from 'styled-components'
import { useTitleCheckLocalStorage } from '../../utils/useLocalStorage'

type CheckListItem = {
  name: string
  check: boolean
}
type CheckListConfig = {
  items: CheckListItem[]
}

type Props = {
  titles: string[]
  row: boolean
}
function ChecksTool({ titles, row }: Props) {
  const [checks, setChecks] = useTitleCheckLocalStorage()

  return (
    <Style data-row={row}>
      <ul>
        {titles.map((title, i) => (
          <li
            key={i}
            onClick={() => setChecks((v) => ({ ...v, [title]: !v[title] }))}
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

ChecksTool.defaultProps = {
  titles: [],
  row: false,
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: grid;
    height: 100%;
  }
  li {
    font-size: 30px;
    padding-left: 8px;
    border: solid 1px #444;
    &[data-checked='true'] {
      background: green;
    }
    span {
      vertical-align: middle;
    }
  }
  &[data-row='true'] {
    ul {
      grid-auto-flow: column;
    }
    li {
    }
  }
`

export default ChecksTool
