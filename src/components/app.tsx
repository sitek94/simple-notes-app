import styled from 'styled-components'
import { Button, Row, Col } from 'antd'

function App() {
  return (
    <Container>
      <Row justify="space-between" align="middle">
        <h1>Simple Notes App</h1>
        <Button type="primary">New Note</Button>
      </Row>
      <Row>
        <Col span={8}>
          <div>
            TODO: Notes List Component
          </div>
        </Col>
        <Col span={16}>
          <form>
            TODO: 
          </form>
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
