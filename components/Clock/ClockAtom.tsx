import styled from 'styled-components'
import { ClockConfig, GadgetMode } from '../../types'
import { ConfigModal } from '../components'
import { useFitty } from '../hooks/useFitty'

type Props = {
  config: ClockConfig
  setConfMode: () => void
  setMainMode: () => void
  mode: GadgetMode
  dateStr: string
  tStrs: string[]
  maxWidth: number
}
function ClockAtom(props: Props) {
  const { config, maxWidth, mode, dateStr } = props
  const [hs, ms, ss] = props.tStrs
  const [ymdRef] = useFitty()
  const [hmdRef] = useFitty()

  return (
    <Style
      bgColor={config.bgColor}
      fontColor={config.fontColor}
      onMouseOver={props.setConfMode}
      // onMouseOut={() => setMode('main')}
    >
      <div className="frame" style={{ maxWidth }}>
        <div>
          {config.dateVisible && (
            <div style={{ marginBottom: '-8%' }}>
              <div className="date" ref={ymdRef}>
                {dateStr}
              </div>
            </div>
          )}
          <div className="time" ref={hmdRef}>
            {hs}
            <span>:</span>
            {ms}
            <span>:</span>
            {ss}
          </div>
        </div>
      </div>
      {mode === 'conf' && (
        <ConfigModal onClose={props.setMainMode}>Config</ConfigModal>
      )}
    </Style>
  )
}

const Style = styled.div<{ bgColor: string; fontColor: string }>`
  --bg-color: ${(p) => p.bgColor};
  --font-color: ${(p) => p.fontColor};
  width: 96%;
  height: 100%;
  padding: 0 2%;
  font-family: 'Roboto';
  position: relative;
  /* display: table; */
  background: var(--bg-color);
  .frame {
    color: var(--font-color);
    display: grid;
    height: 100%;
    vertical-align: middle;
    display: grid;
    margin: 0 auto;

    place-items: center;
    /* border: solid 0.5px gray; */
    > div {
      text-align: center;
      width: 100%;

      .date {
        /* width: 50%; */
        text-align: left;
      }
    }
  }
`

export default ClockAtom
