import { Frequency } from '../../types'
import { swapKeyValue } from '../../utils'

const isNote = (note: string): note is Frequency => /[A-G]#?[1-9]/.test(note)
const SCALE_CHARS = 'ABCDEFG'.split('')
const CODE_CHARS = '345'.split('')

const octKeysB = 'wetyuio['.split('') // C# D# F# G# A#
const octKeys = `asdfghjkl;'`.split('') // CDEFGAB

const oct = 3
const notes = 'CDEFGAB'.split('')
const notesB = 'C# D# F# G# A#'.split(' ')

const makeNoteMaps = (startOct: number, notes: string[]) => {
  const noteByKey: Record<string, Frequency> = {}

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

export const keyboardNotes = CODE_CHARS.map((cc) =>
  SCALE_CHARS.map((sc) => `${sc}${cc}`)
)
  .flat()
  .filter(isNote)

export { noteByKey, keyByNote }
