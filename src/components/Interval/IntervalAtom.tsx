import { LinearProgress } from '@material-ui/core'
import styled from 'styled-components'
import { IntervalStep } from '../../types'
import SizeDef from '../SizeDef'
import { IntervalStatus } from './useInterval'

type Props = {
  timeStr: string
  timeMiliStr: string
  progress: number
  steps: IntervalStep[]
  status: IntervalStatus
}

function IntervalAtom({
  timeStr,
  timeMiliStr,
  steps,
  progress,
  status,
}: Props) {
  return (
    <SizeDef>
      <Style data-status={status}>
        <div className="frame">
          {steps.map((step, i) => (
            <div className="step" key={i}>
              <div className="time">{step.name}</div>
              <div className="time-ms">
                {timeStr}/{step.sec}
              </div>
            </div>
          ))}
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </Style>
    </SizeDef>
  )
}
IntervalAtom.defaultProps = {}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 3%;
  .time {
    width: 20%;
    text-align: center;
    font-size: calc(var(--w) / 11);
    /* font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif; */
    margin: 5%;
    line-height: 1.05em;
  }
  .time-ms {
    /* display: none; */
    font-size: calc(var(--w) / 10 / 2);
  }
  .frame {
    display: grid;
    height: 100%;
    grid-template-columns: max-content 1fr;
    gap: 2%;
    align-items: center;
    justify-content: center;
    /* border: solid 0.5px gray; */
  }
  &[data-status='end'] {
    animation: blinkAnimeS2 0.5s infinite alternate;
  }
  @keyframes blinkAnimeS2 {
    0% {
      background: white;
    }
    100% {
      background: red;
    }
  }
`

export default IntervalAtom
