import styled from 'styled-components'

import { Form, Input, Button as AntButton } from 'antd'
import { Note } from '../types'

interface Props {
  note: Note
  onSubmit: (note: Note) => void
  onCancel: () => void
}

interface FormValues {
  title: Note['title']
  text: Note['text']
}

function NoteForm({ note, onSubmit, onCancel }: Props) {
  function handleSubmit({ title, text }: FormValues) {
    onSubmit({
      id: note.id,
      title,
      text,
    })
  }

  return (
    <Form
      data-testid="note-form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: note.title,
        text: note.text,
      }}
    >
      <Form.Item label="Title" name="title">
        <Input data-testid="input-title" />
      </Form.Item>

      <Form.Item label="Note" name="text">
        <Input.TextArea data-testid="input-text" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" data-testid="save-note">
          Save
        </Button>

        <Button
          type="ghost"
          htmlType="button"
          data-testid="cancel-note"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

const Button = styled(AntButton)`
  margin-right: 8px;
`

export { NoteForm }
