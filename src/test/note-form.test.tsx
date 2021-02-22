import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import notes from './notes.json'
import { NoteForm } from '../components/note-form'

describe('NoteForm Component', () => {
  it('should display title and note form input fields after note is selected', () => {
    // given
    const note = notes[0]
    render(<NoteForm note={note} onSubmit={() => {}} onCancel={() => {}} />)

    // then
    expect(screen.getByRole('textbox', { name: /title/i })).toHaveValue(
      note.title
    )
    expect(screen.getByRole('textbox', { name: /note/i })).toHaveValue(
      note.text
    )
  })

  it('should call onSubmit with changed note after the form is submitted', async () => {
    // given
    const onSubmit = jest.fn()
    const note = { id: 'xyz', title: 'passed title', text: 'passed desc' }

    render(<NoteForm note={note} onSubmit={onSubmit} onCancel={() => {}} />)

    // when
    const titleInput = screen.getByRole('textbox', { name: /title/i })
    const noteInput = screen.getByRole('textbox', { name: /note/i })
    const saveBtn = screen.getByRole('button', { name: /save/i })

    userEvent.clear(titleInput)
    userEvent.type(titleInput, 'new title')
    userEvent.type(noteInput, ' and desc continuation')
    userEvent.click(saveBtn)

    // then
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        id: 'xyz',
        title: 'new title',
        text: 'passed desc and desc continuation',
      })
    })
  })
})
