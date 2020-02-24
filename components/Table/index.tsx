import styled from 'styled-components'

import { useLocalStorage } from 'react-use'

type Props = {
  titles: string[]
}
function Table({ titles }: Props) {
  const [_checks, setChecks] = useLocalStorage<Record<string, boolean>>(
    'titles',
    {}
  )

  return (
    <Style>
      <ul>
        {titles.map((title, i) => (
          <li key={i}>
            <div>
              <input
                type="checkbox"
                onChange={() => setChecks(v => ({ ...v, [title]: !v[title] }))}
              />
              <span>{title}</span>
            </div>
          </li>
        ))}
      </ul>
    </Style>
  )
}

const Style = styled.div`
  height: 100vh;
  width: 100vw;
`

export default Table
