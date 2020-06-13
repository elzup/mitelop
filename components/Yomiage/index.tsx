/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react'
import { iwindow } from '../../utils/browser'

const synth = window.speechSynthesis

type Recognition = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  stop: () => void
  start: () => void
  onend: () => void
  onerror: (e: object) => void
  onresult: (e: any) => void
}

function speak(text: string, rate: number, pitch: number) {
  const utterThis = new SpeechSynthesisUtterance(text)

  utterThis.volume = 1.0 // 音量: 0.0～1.0
  utterThis.rate = rate // 速度: 0.1～10.0
  utterThis.pitch = pitch // 音程: 0.0～2.0
  utterThis.lang = 'ja-JP' // 言語

  synth.speak(utterThis)
}

function Yomiage() {
  const [text, setText] = useState<string>('')
  const [isStart, setIsStart] = useState<boolean>(false)
  const [pitch, setPitch] = useState<number>(1.5)
  const [rate, setRate] = useState<number>(0.8)
  const recognitionRef = useRef<Recognition>()

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const recognition = new iwindow.webkitSpeechRecognition()

    recognition.lang = 'ja-JP'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.continuous = false
    recognition.onerror = (e: unknown) => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = () => {
          // only rewrite
        }
      }
      console.error(e)
      setIsStart(false)
    }
    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  useEffect(() => {
    const recognition = recognitionRef.current

    if (!recognition) return

    recognition.onresult = function (event: any) {
      const text = event.results[event.resultIndex][0].transcript

      setText(text)
      speak(text, pitch, rate)
    }
  }, [!recognitionRef.current, pitch, rate])
  return (
    <div className="App">
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
            if (recognitionRef.current) {
              recognitionRef.current.start()
              recognitionRef.current.onend = () =>
                recognitionRef.current?.start()
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
            if (recognitionRef.current) {
              recognitionRef.current.stop()
              recognitionRef.current.onend = () => {
                // only rewrite
              }
            }
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
