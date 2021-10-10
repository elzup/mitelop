import { now, Synth } from 'tone'
import { Frequency } from '../../types'

export const sound = (freq: Frequency) => {
  const synth = new Synth().toDestination()

  synth.triggerAttackRelease(freq, '8n', now())
}
