import { render, screen, act } from '@testing-library/react'
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

    // then
    const inputTitle = screen.getByRole('textbox', { name: /title/i })
    const inputNote = screen.getByRole('textbox', { name: /note/i })

    expect(inputTitle).toHaveValue(note.title)
    expect(inputNote).toHaveValue(note.text)
  })

  it('should show note form with empty note after new note is clicked', async () => {
    // given
    const mockService = createMockService(notes)
    render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // when
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /plus new note/i }))
    })

    // then
    const inputTitle = screen.getByRole('textbox', { name: /title/i })
    const inputNote = screen.getByRole('textbox', { name: /note/i })

    expect(inputTitle).toHaveValue('')
    expect(inputNote).toHaveValue('')
    expect(mockService.createNote).toHaveBeenCalledTimes(1)
  })

  it('should deselect note and hide the form when clicking on cancel', async () => {
    // given
    const mockService = createMockService(notes)
    const { container } = render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // then
    expect(mockService.getNotes).toHaveBeenCalledTimes(1)

    // when
    userEvent.click(screen.getAllByTestId('note-item')[0])
    userEvent.type(
      screen.getByRole('textbox', { name: /title/i }),
      'changed title'
    )
    userEvent.click(screen.getByRole('button', { name: /cancel/i }))
    await flushPromises() // HTTP data exchange

    // then
    expect(
      container.querySelector('[data-testid=notee-item].ant-menu-item-selected')
    ).toBeNull()
    expect(screen.getAllByTestId('note-item')[0]).toHaveTextContent(
      notes[0].title
    )
  })

  it('should add a new note to the list after the form is submitted', async () => {
    // given
    const mockService = createMockService(notes)
    render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // when
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: /plus new note/i })
      )
      userEvent.type(
        screen.getByRole('textbox', { name: /title/i }),
        'new note title'
      )
      userEvent.type(
        screen.getByRole('textbox', { name: /note/i }),
        'new note body'
      )
      userEvent.click(screen.getByRole('button', { name: /save/i }))
    })

    // then
    expect(mockService.saveNote.mock.calls[0][0]).toMatchObject({
      title: 'new note title',
      text: 'new note body',
    })
    expect(mockService.saveNote).toHaveBeenCalledTimes(1)
    expect(mockService.getNotes).toHaveBeenCalledTimes(2)
    expect(screen.getAllByTestId('note-item')).toHaveLength(
      mockService.notes.length
    )
  })

  it('should update the list when existing note is saved', async () => {
    // given
    const mockService = createMockService(notes)
    render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // when
    userEvent.click(screen.getAllByTestId('note-item')[0])
    userEvent.type(
      screen.getByRole('textbox', { name: /title/i }),
      'changed title'
    )
    userEvent.click(screen.getByRole('button', { name: /save/i }))
    await flushPromises() // HTTP data exchanget

    expect(mockService.saveNote).toHaveBeenCalledTimes(1)
    expect(mockService.getNotes).toHaveBeenCalledTimes(2)

    // then
    const item = screen.getAllByTestId('note-item')[0]
    expect(item).toHaveTextContent('changed title')
  })
})
