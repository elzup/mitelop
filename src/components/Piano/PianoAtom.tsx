import styled from 'styled-components'
import { useKeyPressAll } from '../hooks/useKey'
import SizeDef from '../SizeDef'
import { keyboardNotes, keyByNote, noteByKey } from './pianoNoteConfig'
import { useSynthToggle } from './sound'

type Props = {}

const useKeySound = () => {
  const { soundOn, soundOff } = useSynthToggle()

  const { ref } = useKeyPressAll(
    ({ key }) => {
      const note = noteByKey[key]

      console.log({ key })

      if (!note) return
      soundOn(note)
    },
    ({ key }) => {
      const note = noteByKey[key]

      console.log({ toggle: 'off', key })

      if (!note) return
      soundOff(note)
    }
  )

  return { ref }
}

function PianoAtom({}: Props) {
  const { ref } = useKeySound()

  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style>
        <div className="outer" ref={ref}>
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
