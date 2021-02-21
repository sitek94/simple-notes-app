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
})
