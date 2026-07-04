import styled from 'styled-components'
import { IntervalStep } from '../../types'
import SizeDef from '../SizeDef'
import { IntervalStatus } from './useInterval'

type Props = {
  timeStr: string
  timeMiliStr: string
  steps: IntervalStep[]
  status: IntervalStatus
  /** 表示レイアウト (INTERVAL_LAYOUTS の id) */
  layout?: string
}

function IntervalAtom({ steps, status, layout = 'bar' }: Props) {
  const weights = steps.map((s) => `${s.sec}fr`).join(' ')
  // stack は行方向、それ以外 (bar/focus) は列方向に sec 比で配分する
  const stepsStyle =
    layout === 'stack'
      ? { gridTemplateColumns: '1fr', gridTemplateRows: weights }
      : { gridTemplateColumns: weights }
  const activeStep = steps.find((s) => s.active)
  const remain = activeStep ? activeStep.sec - activeStep.pos : null

  return (
    <SizeDef>
      <Style data-status={status} data-layout={layout}>
        <div className="frame">
          <div className="steps" style={stepsStyle}>
            {steps.map((step, i) => (
              <div className="step" key={i} data-active={step.active}>
                <span
                  className="fill"
                  style={{ width: `${(step.par || 0) * 100}%` }}
                />
                <span className="name">{step.name}</span>
                <span className="sec">{step.sec}s</span>
              </div>
            ))}
          </div>
          <div className="remain">
            <span className="num">{remain ?? '–'}</span>
            <span className="unit">s</span>
          </div>
        </div>
      </Style>
    </SizeDef>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 3% 2%;
  font-family: 'Roboto', sans-serif;

  .frame {
    display: grid;
    height: 100%;
    grid-template-rows: 1fr max-content;
    gap: 4%;
  }
  .steps {
    display: grid;
    gap: 1.5%;
    align-items: stretch;
  }
  .step {
    position: relative;
    overflow: hidden;
    border-radius: calc(var(--w) * 0.02);
    background: #e9e9f2;
    color: #3a3a52;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4%;
  }
  .fill {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #b9c2ff;
    z-index: 0;
  }
  .name,
  .sec {
    position: relative;
    z-index: 1;
    line-height: 1.1;
  }
  .name {
    font-size: calc(var(--w) / 22);
    font-weight: 700;
  }
  .sec {
    font-size: calc(var(--w) / 34);
    opacity: 0.7;
  }
  .step[data-active='true'] {
    background: #dfe4ff;
    color: #1b2a8a;
    box-shadow: inset 0 0 0 2px #2b6cff;
  }
  .step[data-active='true'] .fill {
    background: #7d92ff;
  }

  .remain {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 2%;
    color: #1b2a8a;
  }
  .remain .num {
    font-size: calc(var(--w) / 12);
    font-weight: 700;
    line-height: 1;
  }
  .remain .unit {
    font-size: calc(var(--w) / 24);
    opacity: 0.7;
  }

  /* 現ステップのみ: 他ステップを畳んで active を大きく見せる */
  &[data-layout='focus'] {
    .step:not([data-active='true']) {
      display: none;
    }
    .steps {
      grid-template-columns: 1fr !important;
    }
    .name {
      font-size: calc(var(--w) / 10);
    }
    .sec {
      font-size: calc(var(--w) / 20);
    }
  }

  /* ステップ(縦): 縦積みでも fill は左→右の進捗バーとして機能する */
  &[data-layout='stack'] {
    .name {
      font-size: calc(var(--w) / 14);
    }
    .sec {
      font-size: calc(var(--w) / 22);
    }
  }

  &[data-status='end'] {
    animation: blinkAnimeS2 0.5s infinite alternate;
  }
  @keyframes blinkAnimeS2 {
    0% {
      background: transparent;
    }
    100% {
      background: #ffd5d5;
    }
  }
`

export default IntervalAtom
