import { TicketCount } from '../types/TicketCount';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import React, { FunctionComponent, ReactElement, useState } from 'react';
import { TicketInput, TicketInputChangeHandler } from './TicketInput';

interface BuyTicketsProps {
  available: TicketCount;
  onSubmit: (ticketCount: TicketCount) => void;
}

const createEmptyInputState = (): TicketCount => ({
  back: 0,
  center: 0,
  front: 0
});

const BuyTickets: FunctionComponent<BuyTicketsProps> = ({ available, onSubmit }): ReactElement => {
  const [ inputState, setInputState ] = useState<TicketCount>(createEmptyInputState());

  const createChangeHandler = (position: keyof TicketCount): TicketInputChangeHandler =>
    (newValue: string): void => {
      setInputState((oldState): TicketCount => ({
        ...oldState,
        [position]: Number(newValue)
      }));
    };

  const handleSubmit = (): void => {
    onSubmit(inputState);
    setInputState(createEmptyInputState());
  };

  return (
    <Form>
      <Card style={{ width: '18rem' }}>
        <Card.Header>Tickets kaufen</Card.Header>
        <ListGroup variant='flush' aria-label='Meine Tickets'>
          <ListGroup.Item>
            <TicketInput
              available={ available.front }
              availableText='vorne'
              labelText='Gewünschte Anzahl Tickets vorne'
              onChange={ createChangeHandler('front') }
              value={ inputState.front }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <TicketInput
              available={ available.center }
              availableText='mittig'
              labelText='Gewünschte Anzahl Tickets mitte'
              onChange={ createChangeHandler('center') }
              value={ inputState.center }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <TicketInput
              available={ available.back }
              availableText='hinten'
              labelText='Gewünschte Anzahl Tickets hinten'
              onChange={ createChangeHandler('back') }
              value={ inputState.back }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              aria-label='Jetzt kaufen'
              onClick={ handleSubmit }
            >
              Jetzt kaufen
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Form>
  );
};

export {
  BuyTickets
};
