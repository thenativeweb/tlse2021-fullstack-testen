import { AvailableTickets } from './AvailableTickets';
import { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const App = (): ReactElement => (
  <Container>
    <Row>
      <Col>
        <h1>
          Ticketeer
        </h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Meine gekauften Tickets:</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Verfügbare Tickets:</h2>
      </Col>
    </Row>
  </Container>
);

export default App;
