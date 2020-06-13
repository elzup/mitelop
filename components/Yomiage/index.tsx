import React, { useState } from 'react'
import { iwindow } from '../../utils/browser'

const synth = window.speechSynthesis

// eslint-disable-next-line new-cap
const recognition = new iwindow.webkitSpeechRecognition()

recognition.lang = 'ja-JP'
recognition.interimResults = false
recognition.maxAlternatives = 1
recognition.continuous = false

function Yomiage() {
  const [text, setText] = useState<string>('')
  const [isStart, setIsStart] = useState<boolean>(false)
  const [pitch, setPitch] = useState<number>(1.5)
  const [rate, setRate] = useState<number>(0.8)

  function speak(text: string) {
    const utterThis = new SpeechSynthesisUtterance(text)

    utterThis.volume = 1.0 // 音量: 0.0～1.0
    utterThis.rate = rate // 速度: 0.1～10.0
    utterThis.pitch = pitch // 音程: 0.0～2.0
    utterThis.lang = 'ja-JP' // 言語

    synth.speak(utterThis)
  }

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = function (event: any) {
      const text = event.results[event.resultIndex][0].transcript

      setText(text)
      speak(text)
    }

    return () => {
      recognition.stop()
    }
  }, [])
  return (
    <div className="App">
      <h4>音声認識→合成音声</h4>
      pitch
      <input
        style={{ width: '30%' }}
        type="number"
        defaultValue={pitch}
        min={0.1}
        max={10.0}
        onChange={(e) => {
          setPitch(Number(e.target.value))
        }}
      />
      <br />
      rate
      <input
        type="number"
        min={0}
        style={{ width: '30%' }}
        max={2.0}
        defaultValue={rate}
        onChange={(e) => {
          setRate(Number(e.target.value))
        }}
      />
      <br />
      {!isStart && (
        <button
          onClick={() => {
            setIsStart(true)
            recognition.start()
            recognition.onerror = (e: unknown) => {
              console.error(e)
              setIsStart(false)
            }
            recognition.onend = () => {
              console.log('reco restart')
              if (!isStart) return

              recognition.start()
            }
          }}
        >
          Start
        </button>
      )}
      {isStart && (
        <button
          onClick={() => {
            setIsStart(false)
            recognition.stop()
          }}
        >
          Stop
        </button>
      )}
      <h3>{text}</h3>
    </div>
  )
}

export default Yomiage
