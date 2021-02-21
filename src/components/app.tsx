import * as React from 'react'
import styled from 'styled-components'

import { NotesServices } from '../services/notes'
import { Note } from '../types'

import { Button, Row, Col } from 'antd'
import { NotesList } from './notes-list'

const unselectedNote: Note = {
  id: '',
  title: '',
  text: ''
}

interface Props {
  service: NotesServices
}

function App({ service }: Props) {

  // Handle selection of a task from the list
  function onSelect(note: Note) {}

  return (
    <Container>
      <Row justify="space-between" align="middle">
        <h1>Simple Notes App</h1>
        <Button type="primary">New Note</Button>
      </Row>
      <Row>
        <Col span={8}>
          <NotesList 
            notes={[]}
            onSelect={onSelect}
            selectedNoteId={unselectedNote.id}
          />
        </Col>
        <Col span={16}>
          <form>TODO:</form>
        </Col>
      </Row>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
`

export { App }
