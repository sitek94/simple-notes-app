import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createMockService, flushPromises } from './utils'
import { App } from '../components/app'

describe('App Component', () => {
  const notes = [
    {
      id: '4567',
      title: 'update the exam excercise',
      text: 'netguru makes it better',
    },
    {
      id: 'xyz',
      title: 'look at frontend architecture',
      text: 'from the new perspective',
    },
  ]

  it('should show the notes info and hides the form by default', async () => {
    // given
    const mockService = createMockService(notes)
    render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // then
    expect(screen.queryByTestId('notes-list')).toBeInTheDocument()
    expect(screen.queryByTestId('note-form')).toBeNull()
  })

  it('should fetch notes from notesService when rendered', async () => {
    // given
    const mockService = createMockService(notes)
    const originalLength = mockService.notes.length
    render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // then
    expect(mockService.getNotes).toHaveBeenCalled()
    expect(screen.getAllByTestId('note-item')).toHaveLength(originalLength)
  })

  it('when existing note is clicked it should be highlighted on the list and form should be visible with its deatils', async () => {
    // given
    const mockService = createMockService(notes)
    const note = notes[0]
    render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange
    const noteItem = screen.getByText(note.title)

    // when
    userEvent.click(noteItem)

    const inputTitle = screen.getByRole('textbox', { name: /title/i })
    const inputNote = screen.getByRole('textbox', { name: /note/i })

    // then
    expect(inputTitle).toHaveValue(note.title)
    expect(inputNote).toHaveValue(note.text)
  })
})
