import { render, screen } from '@testing-library/react'

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
})
