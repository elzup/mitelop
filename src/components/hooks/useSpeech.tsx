import { useEffect, useRef, useState } from 'react'
import { iwindow } from '../../utils/browser'

type Recognition = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  stop: () => void
  start: () => void
  onend: () => void
  onerror: (e: RecognitionError) => void
  onresult: (e: unknown) => void
}
type RecognitionError = {
  error: 'no-speech' | 'other'
}

const synth = window.speechSynthesis

function speak(text: string, rate: number, pitch: number) {
  const utterThis = new SpeechSynthesisUtterance(text)

  utterThis.volume = 1.0 // 音量: 0.0～1.0
  utterThis.rate = rate // 速度: 0.1～10.0
  utterThis.pitch = pitch // 音程: 0.0～2.0
  utterThis.lang = 'ja-JP' // 言語

  synth.speak(utterThis)
}

export function useSpeech(pitch: number, rate: number) {
  const [text, setText] = useState<string | null>(null)
  const recognitionRef = useRef<Recognition>()
  const [errorCount, setErrorCount] = useState<number>(0)
  const [isStart, setIsStart] = useState<boolean>(false)
  const speechStart = () => {
    setIsStart(true)
    setErrorCount(0)
    if (recognitionRef.current) {
      recognitionRef.current.start()
      recognitionRef.current.onend = () => recognitionRef.current?.start()
    }
  }

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

    type Result = {
      results: { transcript: string }[][]
      resultIndex: number
    }

    // @ts-ignore
    recognition.onresult = (e: Result) => {
      setErrorCount(0)
      const text = e.results[e.resultIndex][0].transcript

      setText(text)
      speak(text, pitch, rate)
    }
  }, [!recognitionRef.current, pitch, rate])
  const speechStop = () => {
    setIsStart(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current.onend = () => {
        // only rewrite
      }
    }
  }

  return {
    speechStart,
    speechStop,
    isStart,
    recognition: recognitionRef.current,
    text,
  }
}
