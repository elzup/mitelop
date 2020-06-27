/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TextField, Typography } from '@material-ui/core'
import { iwindow } from '../../utils/browser'
import { useLocalStorage } from '../../utils/useLocalStorage'

const synth = window.speechSynthesis

const Style = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;
  grid-template-areas:
    'ctlr ctls'
    'btns btnp'
    'text text';
  .rate-control {
    display: flex;
    grid-area: 'ctlr';
    padding: 8px;
  }
  .speed-control {
    display: flex;
    grid-area: 'ctls';
    padding: 8px;
  }
  button {
    font-size: 10vw;
    &[disabled] {
      opacity: 0.1;
    }
  }
  .start-button {
    grid-area: 'btns';
  }
  .stop-button {
    grid-area: 'btnp';
  }
  h3 {
    grid-area: 'text';
  }
`

type Recognition = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  stop: () => void
  start: () => void
  onend: () => void
  onerror: (e: RecognitionError) => void
  onresult: (e: any) => void
}
type RecognitionError = {
  error: 'no-speech' | 'other'
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
  const [text, setText] = useState<string>('<認識テキストエリア>')
  const [isStart, setIsStart] = useState<boolean>(false)
  const [pitch, setPitch] = useLocalStorage<number>('speech-pitch', 1.0)
  const [rate, setRate] = useLocalStorage<number>('speech-rate', 1.1)
  const [errorCount, setErrorCount] = useState<number>(0)
  const recognitionRef = useRef<Recognition>()

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const recognition = new iwindow.webkitSpeechRecognition()

    recognition.lang = 'ja-JP'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.continuous = false
    recognition.onerror = (e: RecognitionError) => {
      setErrorCount((e) => e + 1)
      if (recognitionRef.current) {
        if (e.error === 'no-speech' && errorCount < 3) {
          recognitionRef.current.start()
          return
        } else {
          recognitionRef.current.onend = () => {
            // only rewrite
          }
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
      setErrorCount(0)
      const text = event.results[event.resultIndex][0].transcript

      setText(text)
      speak(text, pitch, rate)
    }
  }, [!recognitionRef.current, pitch, rate])
  return (
    <Style>
      <div className="speed-control">
        <TextField
          type="number"
          label="Speed"
          fullWidth
          size="small"
          defaultValue={pitch}
          inputProps={{ min: 0.1, max: 10.0, step: 0.1 }}
          onChange={(e) => {
            setPitch(Number(e.target.value))
          }}
        />
      </div>
      <div className="rate-control">
        <TextField
          type="number"
          label="Rate"
          size="small"
          fullWidth
          inputProps={{ min: 0, max: 2.0, step: 0.1 }}
          defaultValue={rate}
          onChange={(e) => {
            setRate(Number(e.target.value))
          }}
        />
      </div>
      <button
        className="start-button"
        disabled={isStart}
        onClick={() => {
          setIsStart(true)
          setErrorCount(0)
          if (recognitionRef.current) {
            recognitionRef.current.start()
            recognitionRef.current.onend = () => recognitionRef.current?.start()
          }
        }}
      >
        Start
      </button>
      <button
        className="stop-button"
        disabled={!isStart}
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
      <h3>{text}</h3>
    </Style>
  )
}

export default Yomiage
