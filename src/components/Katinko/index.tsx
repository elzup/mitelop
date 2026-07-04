import { useState } from 'react'
import styled from 'styled-components'
import SizeDef from '../SizeDef'

/** 編集点を記録するカチンコ (clapperboard)。クラップ部クリックで編集点をマーク。 */
function Katinko() {
  const [recording, setRecording] = useState(false)
  const [take, setTake] = useState(1)
  const [flash, setFlash] = useState(false)

  const clip = () => {
    setFlash(true)
    setTake((t) => t + 1)
    // 一瞬フラッシュして編集点を目立たせる
    window.setTimeout(() => setFlash(false), 350)
  }

  const state = flash ? 'CLIP!' : recording ? '● REC' : 'READY'

  return (
    <SizeDef>
      <Board data-recording={recording} data-flash={flash}>
        <div className="clap" onClick={clip} title="クリックで編集点をマーク" />
        <div className="slate">
          <div className="row">
            <span className="label">TAKE</span>
            <span className="value">{take}</span>
          </div>
          <div className="state">{state}</div>
        </div>
        <div className="controls">
          <button
            type="button"
            className="rec"
            data-on={recording}
            onClick={() => setRecording((v) => !v)}
          >
            {recording ? 'STOP' : 'REC'}
          </button>
          <button type="button" className="clip" onClick={clip}>
            CLIP
          </button>
        </div>
      </Board>
    </SizeDef>
  )
}

const Board = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 18% 1fr max-content;
  background: #1b1b1f;
  color: #f2f2f2;
  font-family: 'Roboto', monospace;
  overflow: hidden;

  .clap {
    cursor: pointer;
    background: repeating-linear-gradient(-58deg, #111 0 7%, #f5f5f5 7% 14%);
    border-bottom: 2px solid #000;
  }

  .slate {
    display: grid;
    place-items: center;
    gap: 2%;
    padding: 4%;
  }
  .row {
    display: flex;
    align-items: baseline;
    gap: 4%;
  }
  .label {
    font-size: calc(var(--w) * 0.06);
    color: #9a9aa5;
    letter-spacing: 0.1em;
  }
  .value {
    font-size: calc(var(--w) * 0.16);
    font-weight: 700;
  }
  .state {
    font-size: calc(var(--w) * 0.11);
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #59d98a;
  }

  &[data-recording='true'] .state {
    color: #ff5252;
  }
  &[data-flash='true'] {
    background: #fff;
    color: #111;
  }
  &[data-flash='true'] .state {
    color: #ff7a18;
  }

  .controls {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    padding: 4px;
    background: #0d0d10;
  }
  button {
    padding: 6% 0;
    border: none;
    border-radius: 4px;
    font-size: calc(var(--w) * 0.06);
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #f2f2f2;
    background: #33333a;
    cursor: pointer;
  }
  button:hover {
    filter: brightness(1.2);
  }
  .rec[data-on='true'] {
    background: #ff5252;
    color: #fff;
  }
  .clip {
    background: #2b6cff;
    color: #fff;
  }
`

export default Katinko
