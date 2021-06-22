import { Slider as MuiSlider } from '@material-ui/core'
import styled from 'styled-components'

function Slider() {
  return (
    <Style>
      <div className="frame">
        <MuiSlider />
      </div>
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content 1fr;
  .frame {
    display: grid;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
    span {
      text-align: center;
      font-size: calc(100% / 5);
      line-height: 1.05em;

      &.date {
        text-align: unset;
        font-size: calc(100% / 5 / 3);
      }
    }
  }
`

export default Slider
