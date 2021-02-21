import { act } from 'react-dom/test-utils'
import _flushPromises from 'flush-promises'

import { NotesServices } from '../services/notes'
import { Notes } from '../types'

/**
 * Flush all pending resolved promise handlers.
 */
export const flushPromises = async () => {
  await act(async () => {
    await _flushPromises()
  })
}
/**
 * Creates mocked Notes Service.
 */
export function createMockService(notesData: Notes) {
  const svc = new NotesServices(notesData)
  jest.spyOn(svc, 'getNotes')
  jest.spyOn(svc, 'createNote')
  jest.spyOn(svc, 'saveNote')
  return svc
}
