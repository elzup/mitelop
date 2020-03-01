import styled from 'styled-components'

export const Preview = styled.div`
  > div {
    border: solid blue 4px;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
`

export const GeneratorFrame = styled.div`
  > div {
    width: 100%;
    min-width: 1100px;
    display: grid;
    grid-template-columns: max-content 1fr;
    > div {
      width: 350px;
      padding: 8px;
    }
  }
`
