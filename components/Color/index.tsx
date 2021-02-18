import styled from 'styled-components'

function Color({ color }: { color: string }) {
  return <Style style={{ background: color }}></Style>
}

const Style = styled.div`
  height: 100vh;
  width: 100vw;
`

export default Color
