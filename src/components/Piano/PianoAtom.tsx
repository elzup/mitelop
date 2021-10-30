import styled from 'styled-components'
import { useKeyPressAll } from '../hooks/useKey'
import SizeDef from '../SizeDef'
import { keyboardLib, noteByKey } from './pianoNoteConfig'
import { useSynthToggle } from './sound'

type Props = {}

const useKeySound = () => {
  const { soundOn, soundOff } = useSynthToggle()

  const { ref } = useKeyPressAll(
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

  return { ref }
}

function PianoAtom({}: Props) {
  const { ref } = useKeySound()

  return (
    <SizeDef portRate={1.6} landRate={2}>
      <Style>
        <div className="outer" ref={ref} tabIndex={-1}>
          <div className="inner">
            <div className="keyboard">
              {keyboardLib.map((k) => {
                return (
                  <div className="key" key={k.note} data-black={k.black}>
                    {k.keyboard}
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
  .keyboard {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    .key {
      border: solid 1px;
    }
  }
`

export default PianoAtom
