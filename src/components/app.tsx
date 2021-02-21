import * as React from 'react'
import styled from 'styled-components'

import notes from '../test/notes.json'
import { NotesServices } from '../services/notes'
import { Note } from '../types'

import { Button, Row, Col, Layout, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { NotesList } from './notes-list'
import { NoteForm } from './note-form'

const { Title } = Typography
const { Content: AntContent, Header: AntHeader } = Layout

const unselectedNote: Note = {
  id: '',
  title: '',
  text: '',
}

interface Props {
  service: NotesServices
}

function App({ service }: Props) {
  // Handle selection of a task from the list
  function onSelect(note: Note) {}

  return (
    <Layout>
      <Header>
        <Title level={1}>Simple Notes App</Title>
        <Button
          type="primary"
          size="large"
          shape="round"
          icon={<PlusOutlined />}
        >
          New Note
        </Button>
      </Header>
      <Content>
        <Row>
          <Col span={8}>
            <NotesList
              notes={notes}
              onSelect={onSelect}
              selectedNoteId={notes[0].id}
            />
          </Col>
          <Col span={16}>
            <NoteForm
              note={unselectedNote}
              onSubmit={() => {}}
              onCancel={() => {}}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

const Header = styled(AntHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: #fff;
    margin-bottom: 0;
  }
`
const Content = styled(AntContent)`
  height: 100vh;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 25px;
  background-color: #fff;
`
export { App }
