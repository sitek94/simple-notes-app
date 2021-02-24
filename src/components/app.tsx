import * as React from 'react'
import styled from 'styled-components'

import { NotesServices } from '../services/notes'
import { Note, Notes } from '../types'

import { Button, Empty, Row, Col, Layout, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { NotesList } from './notes-list'
import { NoteForm } from './note-form'

const { Title } = Typography
const { Content: AntContent, Header: AntHeader } = Layout

interface Props {
  service: NotesServices
}

function App({ service }: Props) {
  const [notes, setNotes] = React.useState<Notes>([])
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null)

  React.useEffect(() => {
    ;(async function fetchNotes() {
      try {
        const fetchedNotes = await service.getNotes()

        setNotes(fetchedNotes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [service, setNotes])

  // Handle "New note" click
  async function newNote() {
    try {
      const emptyNote = await service.createNote()

      setSelectedNote(emptyNote)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle NoteForm submit and save the note
  async function onSubmit(note: Note) {
    try {
      await service.saveNote(note)

      const updatedNotes = await service.getNotes()

      setNotes(updatedNotes)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle selection of a task from the list
  function onSelect(note: Note) {
    setSelectedNote(note)
  }

  // Handle cancel of note editing/creating
  function onCancel() {
    setSelectedNote(null)
  }

  return (
    <Layout>
      <Header>
        <HeaderRow justify="space-between" align="middle">
          <Title level={1}>Simple Notes App</Title>
          <Button
            type="primary"
            size="large"
            shape="round"
            icon={<PlusOutlined />}
            onClick={newNote}
          >
            New Note
          </Button>
        </HeaderRow>
      </Header>
      <Content>
        <Row gutter={24}>
          <Col span={6}>
            <NotesList
              notes={notes}
              onSelect={onSelect}
              selectedNoteId={selectedNote?.id}
            />
          </Col>
          <Col span={18}>
            {selectedNote ? (
              <NoteForm
                key={selectedNote.id}
                note={selectedNote}
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            ) : (
              <Empty description="Select a note to edit or create a new one" />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

const Header = styled(AntHeader)`
  h1 {
    color: #fff;
    margin-bottom: 0;
  }
`

const HeaderRow = styled(Row)`
  max-width: 1000px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`

const Content = styled(AntContent)`
  height: 100vh;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  background-color: #fff;
`

export { App }
