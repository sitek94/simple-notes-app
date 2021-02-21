import { render, screen } from '@testing-library/react'

import { Notes } from '../types'
import { NotesList } from '../components/notes-list'
const notes: Notes = require('./notes.json')

describe('NotesList Component', () => {
  it('should show list of notes', () => {
    // given
    render(<NotesList notes={notes} />)

    // then
    expect(screen.getAllByTestId('note-item')).toHaveLength(notes.length)
  })
})
