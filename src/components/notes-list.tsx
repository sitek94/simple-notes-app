import { Note, Notes } from '../types'

interface Props {
  notes: Notes
  selectedNoteId: Note['id']
  onSelect: (note: Note) => void
}

function NotesList({
  notes = [],
  selectedNoteId = '',
  onSelect = (note: Note) => {},
}: Props) {
  return (
    <div>
      <ul>
        <li>Note placeholder</li>
        <li>Active Note placeholder</li>
      </ul>
    </div>
  )
}

export { NotesList }
