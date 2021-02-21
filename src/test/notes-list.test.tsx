import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import notes from './notes.json'
import { NotesList } from '../components/notes-list'

describe('NotesList Component', () => {
  it('should show list of notes', () => {
    // given
    render(<NotesList notes={notes} />)

    // then
    expect(screen.getAllByTestId('note-item')).toHaveLength(notes.length)
  })

  it('should call onSelect function after note was clicked', () => {
    // given
    const onSelect = jest.fn()
    render(<NotesList notes={notes} onSelect={onSelect} />)

    // when
    const item = screen.getAllByTestId('note-item')[1]
    userEvent.click(item)

    // then
    expect(onSelect).toHaveBeenCalledWith(notes[1])
  })

  it('should add `ant-menu-item-selected` class to the note with `id` that matches `selectedNoteId`', () => {
    // given
    const note = notes[1]
    render(<NotesList notes={notes} selectedNoteId={note.id} />)

    // then
    const noteItem = screen.getByText(note.title)
    expect(noteItem).toHaveClass('ant-menu-item-selected')
  })
})
