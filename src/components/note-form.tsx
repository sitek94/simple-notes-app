import styled from 'styled-components'

import { Form, Input, Button as AntButton } from 'antd'
import { Note } from '../types'

interface Props {
  note: Note
  onSubmit: (note: Note) => void
  onCancel: () => void
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
}

const tailLayout = {
  wrapperCol: { offset: 4, span: 15 },
}

function NoteForm({ note, onSubmit, onCancel }: Props) {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Form {...layout} size="large" onFinish={handleSubmit}>
      <Form.Item label="Title" name="title">
        <Input data-testid="input-title" />
      </Form.Item>

      <Form.Item label="Note" name="text">
        <Input.TextArea data-testid="input-text" />
      </Form.Item>

      <Form.Item {...tailLayout}>
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
