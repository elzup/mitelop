import styled from 'styled-components'
import { useState } from 'react'

type Props = {
  titles: string[]
}
function Table({ titles }: Props) {
  const [checks, setChecks] = useState<Record<string, boolean>>({})

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

const Style = styled.div``

export default Table
