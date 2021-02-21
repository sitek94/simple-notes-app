import { Note } from "../types"

interface Props {
  note: Note
  onSubmit: (note: Note) => void
  onCancel: () => void
}

function NoteForm({ note, onSubmit, onCancel }: Props) {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          data-testid="input-title"
          value={''}
          onChange={() => {}}
        />
      </div>
      <div>
        <label>Note:</label>
        <textarea
          data-testid="input-text"
          value={''}
          onChange={() => {}}
        />
      </div>
      <div>
        <input
          type="button"
          data-testid="cancel-note"
          value="Cancel"
          onClick={onCancel}
        />
        <input
          type="submit"
          data-testid="save-note"
          value="Save"
        />
      </div>
    </form>
  )
}

export { NoteForm }
