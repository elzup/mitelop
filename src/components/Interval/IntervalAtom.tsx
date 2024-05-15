import { Box, LinearProgress, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { IntervalStep } from '../../types'
import SizeDef from '../SizeDef'
import { IntervalStatus } from './useInterval'

type Props = {
  timeStr: string
  timeMiliStr: string
  steps: IntervalStep[]
  status: IntervalStatus
}

function IntervalAtom({ steps, status }: Props) {
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(activeStep?.par || 0) * 100}
                style={{ height: '10vh' }}
              />
            </Box>
            <Box sx={{ minWidth: '10%' }}>
              <Typography variant="body2" className="remain">
                {activeStep ? activeStep.sec - activeStep.pos : '-'}s
              </Typography>
            </Box>
          </Box>
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
  padding: 2% 1%;
  .name {
    font-size: calc(var(--w) / 30);
    /* font-family: 'Roboto', 'Helvetica', 'Arial', monospace, sans-serif; */
    margin: 5%;
    line-height: 1.05em;
  }
  .time-ms {
    /* display: none; */
    font-size: calc(var(--w) / 30);
  }
  .frame {
    display: grid;
    height: 100%;
    grid-template-rows: 2fr 1fr;
    gap: 5%;
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
      border-bottom: solid 1rem red;
      background: #ffaaaa;
    }
  }
  .remain {
    text-align: right;
    font-size: calc(var(--w) / 30);
  }
  &[data-status='end'] {
    animation: blinkAnimeS2 0.5s infinite alternate;
  }
`

export default IntervalAtom
