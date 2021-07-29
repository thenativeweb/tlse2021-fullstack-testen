import { BuyTicketsContainer } from './BuyTickets/BuyTicketsContainer';
import { MyTicketsContainer } from './MyTickets/MyTicketsContainer';
import { ReactElement } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

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
        <Tabs defaultActiveKey='mytickets' transition={ false } unmountOnExit={ true } mountOnEnter={ true }>
          <Tab eventKey='mytickets' title='Meine Tickets'>
            <MyTicketsContainer />
          </Tab>
          <Tab eventKey='buytickets' title='Tickets kaufen'>
            <BuyTicketsContainer />
          </Tab>
        </Tabs>
      </Col>
    </Row>
    <Row>
      <Col />
    </Row>
  </Container>
);

export default App;
