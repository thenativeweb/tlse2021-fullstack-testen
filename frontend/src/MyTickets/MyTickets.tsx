import { FunctionComponent } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { TicketCount } from "../types/TicketCount";

type MyTicketsProps = {
  tickets: TicketCount
};

const MyTickets: FunctionComponent<MyTicketsProps> = ({tickets}) => {
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Header>Featured</Card.Header>
      <ListGroup variant="flush" aria-label='Meine Tickets'>
        <ListGroup.Item>Vorne: { tickets.front }</ListGroup.Item>
        <ListGroup.Item>Mitte: { tickets.center }</ListGroup.Item>
        <ListGroup.Item>Hinten: { tickets.back }</ListGroup.Item>
      </ListGroup>
  </Card>
  </>
  )
  
}

export {
  MyTickets
};
