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
})
