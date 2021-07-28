import { TicketCount } from './types/TicketCount';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FunctionComponent, ReactElement } from 'react';

interface AvailableTicketsProps {
  available: TicketCount;
}

const AvailableTickets: FunctionComponent<AvailableTicketsProps> = ({ available }): ReactElement => (
  <Form>
    <Row className='lg-1'>
      <Col>
        <InputGroup>
          <Form.Label column={ true } sm='2' htmlFor='available-front'>Vorne</Form.Label>
          <Form.Control type='number' aria-label='Tickets vorne' aria-describedby='available-front' />
          <InputGroup.Text id='available-front'>(noch { available.front } verfügbar)</InputGroup.Text>
        </InputGroup>
      </Col>
    </Row>
    <Row>
      <Col className='lg-3'>
        <InputGroup className='md-3'>
          <Form.Label htmlFor='available-front'>Mitte</Form.Label>
          <Form.Control aria-label='Tickets vorne' aria-describedby='available-front' />
          <InputGroup.Text id='available-front'>(222 verfügbar)</InputGroup.Text>
        </InputGroup>
      </Col>
    </Row>

  </Form>
);

export {
  AvailableTickets
};
