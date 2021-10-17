import { useState } from 'react'
import { useKeyPressEvent } from 'react-use'
import styled from 'styled-components'
import { Note } from '../../types'
import { swapKeyValue } from '../../utils'
import SizeDef from '../SizeDef'
import { sound } from './sound'

type Props = {}

const isNote = (note: string): note is Note => /[A-G]#?[1-9]/.test(note)
const SCALE_CHARS = 'ABCDEFG'.split('')
const CODE_CHARS = '345'.split('')

const keyboardNotes = CODE_CHARS.map((cc) =>
  SCALE_CHARS.map((sc) => `${sc}${cc}`)
)
  .flat()
  .filter(isNote)

const octKeysB = 'wetyuio['.split('') // C# D# F# G# A#
const octKeys = `asdfghjkl;'`.split('') // CDEFGAB

const oct = 3
const notes = 'CDEFGAB'.split('')
const notesB = 'C# D# F# G# A#'.split(' ')

const makeNoteMaps = (startOct: number, notes: string[]) => {
  const noteByKey: Record<string, Note> = {}

  for (const [i, c] of Object.entries(octKeys)) {
    const oct = startOct + Math.floor(Number(i) / 7)
    const noteKey = notes[Number(i) % 7]
    const note = `${noteKey}${oct}`

    if (isNote(note)) {
      noteByKey[c] = note
    }
  }

  for (const [i, c] of Object.entries(octKeysB)) {
    const oct = startOct + Math.floor(Number(i) / 5)
    const noteKey = notesB[Number(i) % 5]
    const note = `${noteKey}${oct}`

    if (isNote(note)) {
      noteByKey[c] = note
    }
  }

  return { noteByKey, keyByNote: swapKeyValue(noteByKey) } as const
}

const { noteByKey, keyByNote } = makeNoteMaps(oct, notes)

const useKeySound = () => {
  const [pressed, setPressed] = useState<Record<string, boolean>>({})
  const onPress = (key: string) => {
    const note = noteByKey[key]

    if (pressed[key]) return

    setPressed((v) => ({ ...v, [key]: true }))

    if (!note) return

    // sound(note)
  }
  const onRelease = (key: string) => {
    setPressed((v) => ({ ...v, [key]: false }))
  }

  return { onPress, onRelease }
}

function PianoAtom({}: Props) {
  const { onPress, onRelease } = useKeySound()

  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style
        onKeyUp={(e) => onRelease(e.key)}
        onKeyDownCapture={(e) => onPress(e.key)}
        tabIndex={-1}
      >
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
