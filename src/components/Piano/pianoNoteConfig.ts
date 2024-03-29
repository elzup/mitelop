import { invert } from '@elzup/kit'
import { Frequency } from '../../types'

const isNote = (note: string): note is Frequency => /[A-G]#?[1-9]/.test(note)
// const SCALE_CHARS = 'CDEFGAB'.split('')
const CODE_CHARS = '345'.split('')

const octKeysB = 'wetyuio['.split('') // C# D# F# G# A#
const octKeys = `asdfghjkl;'`.split('') // CDEFGAB

const oct = 3
const notes = 'CDEFGAB'.split('')
const notesB = 'C# D# F# G# A#'.split(' ')
const SCALE_CHARS_ALL = 'C C# D D# E F F# G G# A A# B'.split(' ')

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

  return { noteByKey, keyByNote: invert(noteByKey) } as const
}
const { noteByKey, keyByNote } = makeNoteMaps(oct, notes)

export const keyboardNotes = CODE_CHARS.map((cc) =>
  SCALE_CHARS_ALL.map((sc) => `${sc}${cc}`)
)
  .flat()
  .filter(isNote)
type NoteButton = {
  black: boolean
  keyboard: string
  note: string
}
export const keyboardLib: NoteButton[] = keyboardNotes.map((note) => ({
  note,
  keyboard: keyByNote[note],
  black: note.includes('#'),
}))

export { noteByKey, keyByNote }
