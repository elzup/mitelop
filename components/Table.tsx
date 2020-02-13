import styled from 'styled-components'

type Props = {
  titles: string[]
}
function Table({ titles }: Props) {
  return (
    <Style>
      <ul>
        {titles.map((title, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </Style>
  )
}

const Style = styled.div``

export default Table
