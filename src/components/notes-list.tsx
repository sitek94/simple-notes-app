import { Menu } from 'antd'
import { Note, Notes } from '../types'

interface Props {
  notes: Notes
  selectedNoteId?: Note['id']
  onSelect?: (note: Note) => void
}

function NotesList({
  notes = [],
  selectedNoteId = '',
  onSelect = (note: Note) => {},
}: Props) {
  return (
    <Menu>
      {notes.map(({ id, title }) => (
        <Menu.Item key={id} data-testid="note-item">
          {title}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export { NotesList }
