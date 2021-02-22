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
        <HeaderRow justify="space-between" align="middle">
          <Title level={1}>Simple Notes App</Title>
          <Button
            type="primary"
            size="large"
            shape="round"
            icon={<PlusOutlined />}
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
              selectedNoteId={notes[0].id}
            />
          </Col>
          <Col span={18}>
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
