import { assert } from 'assertthat';
import { MyTickets } from './MyTickets';
import { TicketCount } from '../types/TicketCount';
import { render, screen } from '@testing-library/react';

describe('MyTickets', (): void => {
  it('shows the number of tickets for the back.', async (): Promise<void> => {
    const tickets: TicketCount = { back: 2, center: 0, front: 0 };

    render(<MyTickets tickets={ tickets } />);

    assert.that(screen.getByText('Hinten: 2')).is.not.null();
  });

  it('shows the number of tickets for all positions.', async (): Promise<void> => {
    const tickets: TicketCount = { back: 1, center: 2, front: 3 };

    render(<MyTickets tickets={ tickets } />);

    assert.that(screen.getByText('Hinten: 1')).is.not.null();
    assert.that(screen.getByText('Mitte: 2')).is.not.null();
    assert.that(screen.getByText('Vorne: 3')).is.not.null();
  });

  it('has an aria label to present the ticket list.', async (): Promise<void> => {
    const tickets: TicketCount = { back: 1, center: 2, front: 3 };

    render(<MyTickets tickets={ tickets } />);

    const ticketList = screen.getByLabelText('Meine Tickets');

    assert.that(ticketList).is.not.null();
    assert.that(ticketList.children.length).is.equalTo(3);
  });
});
