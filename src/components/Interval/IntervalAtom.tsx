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
  const gridTemplateColumns = steps.map((s) => `${s.sec}fr`).join(' ')
  const activeStep = steps.find((s) => s.active)

  return (
    <SizeDef>
      <Style data-status={status}>
        <div className="frame">
          <div className="steps" style={{ gridTemplateColumns }}>
            {steps.map((step, i) => (
              <div className="step" key={i} data-active={step.active}>
                <div className="name">{step.name}</div>
                <div className="time-ms">{step.sec}s</div>
              </div>
            ))}
          </div>
          <div>{activeStep ? activeStep.name : ''}</div>
          <LinearProgress
            variant="determinate"
            value={(activeStep?.par || 0) * 100}
          />
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
  padding: 2%;
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
    grid-auto-flow: row;
    height: 100%;
    grid-template-rows: 2fr 1fr 1fr;
    /* border: solid 0.5px gray; */
  }
  .steps {
    display: grid;
    height: 100%;
    gap: 0.2%;
    align-items: center;
    justify-content: center;
  }
  .step {
    height: 100%;
    border: solid 1px gray;
    align-items: center;
    text-align: center;
    &[data-active='true'] {
      border-bottom: solid 2px red;
    }
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
