import styled from 'styled-components'

export const Preview = styled.div`
  > div {
    border-right: dashed;
    border-bottom: dashed;
    border-width: 4px;
    border-top: solid 20px;
    border-left: solid 4px;
    border-color: #2b0065;
    border-radius: 8px;
  }
  iframe {
    border: solid 2px white;
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
