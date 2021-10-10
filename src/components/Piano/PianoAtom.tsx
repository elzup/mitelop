import { useKeyPressEvent } from 'react-use'
import styled from 'styled-components'
import { Note } from '../../types'
import { swapKeyValue } from '../../utils'
import SizeDef from '../SizeDef'
import { sound } from './sound'

type Props = {}

const isNote = (note: string): note is Note => /[A-F][1-9]/.test(note)
const SCALE_CHARS = 'ABCDEFG'.split('')
const CODE_CHARS = '345'.split('')

const keyboardNotes = CODE_CHARS.map((cc) =>
  SCALE_CHARS.map((sc) => `${sc}${cc}`)
)
  .flat()
  .filter(isNote)

const noteByKey: Record<string, Note> = {
  a: 'A3',
  s: 'B3',
  d: 'C3',
  f: 'D3',
  g: 'E3',
}
const keyByNote = swapKeyValue(noteByKey)

function PianoAtom({}: Props) {
  useKeyPressEvent(
    () => true,
    (e) => {
      console.log(e.key)
      const note = noteByKey[e.key]

      if (!note) return

      console.log({ note })

      sound(note)
    }
  )

  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style>
        <div className="outer">
          <div className="inner">
            <div className="keyboard">
              {keyboardNotes.map((note) => {
                return (
                  <div key={note}>
                    [{keyByNote[note]}]{note}
                  </div>
                )
              })}
            </div>
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
  position: relative;

  .outer {
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;

    .inner {
      max-width: var(--w);
      max-height: var(--h);
      text-align: center;
    }
  }
`

export default PianoAtom
