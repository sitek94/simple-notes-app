import { v4 as uuid } from 'uuid'
import { Note, Notes } from '../types'

export class NotesServices {
  notes: Notes

  constructor(data: Notes) {
    this.notes = data
  }

  /**
   * Gets up-to-date list of notes
   */
  async getNotes() {
    return this.notes
  }

  update(updateCb: (notes: Notes) => void) {
    const clone = [...this.notes]
    updateCb(clone)
    this.notes = clone
  }

  /**
   * Create new note
   */
  async createNote() {
    return {
      id: uuid(),
      title: '',
      text: '',
    }
  }

  /**
   * Updates note if exists, adds new if not
   * @param note
   */
  async saveNote(note: Note) {
    const index = this.notes.findIndex(({ id }) => note.id === id)
    const noteExists = index !== -1

    if (noteExists) {
      this.update((notes) => notes.splice(index, 1, note))
    } else {
      this.update((notes) => notes.push(note))
    }
  }
}
