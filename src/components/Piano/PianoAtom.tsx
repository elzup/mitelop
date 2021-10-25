import { useEffect } from 'react'
import { useKeyPress, useKeyPressEvent } from 'react-use'
import styled from 'styled-components'
import { useKeyPressAll } from '../hooks/useKey'
import SizeDef from '../SizeDef'
import { keyboardNotes, keyByNote, noteByKey } from './pianoNoteConfig'
import { useSynthToggle } from './sound'

type Props = {}

const useKeySound = () => {
  const { soundOn, soundOff } = useSynthToggle()

  useKeyPressAll(
    ({ key }) => {
      const note = noteByKey[key]

      if (!note) return
      soundOn(note)
    },
    ({ key }) => {
      const note = noteByKey[key]

      if (!note) return
      soundOff(note)
    }
  )
}

function PianoAtom({}: Props) {
  useKeySound()

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
