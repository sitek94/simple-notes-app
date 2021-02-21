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
    <Menu selectable={false}>
      {notes.map((note) => (
        <Menu.Item
          key={note.id}
          data-testid="note-item"
          onClick={() => onSelect(note)}
        >
          {note.title}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export { NotesList }
