import { useRef } from 'react'
import { Synth } from 'tone'
import { Frequency } from '../../types'

const makeSynth = () =>
  new Synth({
    oscillator: {
      // type: 'amtriangle',
      // harmonicity: 0.5,
      // modulationType: 'sine',
    },
    envelope: {
      attackCurve: 'exponential',
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.8,
    },
    portamento: 0.05,
  }).toDestination()

export const soundStart = (freq: Frequency, synth: Synth) => {
  synth.triggerAttack(freq)
}

export const soundEnd = (synth: Synth) => {
  synth.triggerRelease()
}

export function useSynthToggle() {
  const ref = useRef({} as Record<Frequency, Synth>)

  const soundOn = (freq: Frequency) => {
    if (!ref.current) return
    if (!ref.current[freq]) {
      ref.current = { ...ref.current, [freq]: makeSynth() }
    }

    const synth = ref.current[freq]

    soundStart(freq, synth)
  }

  const soundOff = (freq: Frequency) => {
    const synth = ref.current?.[freq]

    if (!synth) return

    soundEnd(synth)
  }

  return { soundOn, soundOff }
}
