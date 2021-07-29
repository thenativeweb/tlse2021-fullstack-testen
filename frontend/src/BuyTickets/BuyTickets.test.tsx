import { assert } from 'assertthat';
import { BuyTickets } from './BuyTickets';
import { TicketCount } from '../types/TicketCount';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import * as sinon from 'sinon';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

describe('BuyTickets', (): void => {
  it('renders the input fields for all positions.', async (): Promise<void> => {
    const availableTickets: TicketCount = { front: 2, back: 2, center: 2 };

    render(<BuyTickets available={ availableTickets } onSubmit={ noop } />);

    assert.that(screen.getByLabelText('Gewünschte Anzahl Tickets vorne')).is.not.null();
    assert.that(screen.getByLabelText('Gewünschte Anzahl Tickets mitte')).is.not.null();
    assert.that(screen.getByLabelText('Gewünschte Anzahl Tickets hinten')).is.not.null();
  });

  it('renders the available tickets.', async (): Promise<void> => {
    const availableTickets: TicketCount = { front: 2, back: 3, center: 4 };

    render(<BuyTickets available={ availableTickets } onSubmit={ noop } />);

    assert.that(screen.getByText('Noch 2 vorne verfügbar.')).is.not.null();
    assert.that(screen.getByText('Noch 4 mittig verfügbar.')).is.not.null();
    assert.that(screen.getByText('Noch 3 hinten verfügbar.')).is.not.null();
  });

  it('changes the value of the input field on input.', async (): Promise<void> => {
    const availableTickets: TicketCount = { front: 2, back: 3, center: 4 };

    render(<BuyTickets available={ availableTickets } onSubmit={ noop } />);
    const frontInput = screen.getByLabelText('Gewünschte Anzahl Tickets vorne');

    userEvent.type(frontInput, '22');

    assert.that(screen.getByDisplayValue(22)).is.not.null();
  });

  it('renders the buy button.', async (): Promise<void> => {
    const availableTickets: TicketCount = { front: 2, back: 3, center: 4 };

    render(<BuyTickets available={ availableTickets } onSubmit={ noop } />);

    assert.that(screen.getByLabelText('Jetzt kaufen')).is.not.null();
  });

  it('on clicking the buy button, fires the onSubmit-callback with the data given.', async (): Promise<void> => {
    const availableTickets: TicketCount = { front: 2, back: 3, center: 4 };
    const onSubmitSpy = sinon.spy();

    render(<BuyTickets available={ availableTickets } onSubmit={ onSubmitSpy } />);
    const frontInput = screen.getByLabelText('Gewünschte Anzahl Tickets vorne');

    userEvent.type(frontInput, '22');

    assert.that(screen.getByDisplayValue(22)).is.not.null();
    const buyButton = screen.getByLabelText('Jetzt kaufen');

    userEvent.click(buyButton);

    assert.that(onSubmitSpy.callCount).is.equalTo(1);
    assert.that(onSubmitSpy.args[0][0]).is.equalTo({
      front: 22,
      center: 0,
      back: 0
    });
  });

  it('resets the input values to 0 after submit.', async (): Promise<void> => {
    const availableTickets: TicketCount = { front: 2, back: 3, center: 4 };
    const onSubmitSpy = sinon.spy();

    render(<BuyTickets available={ availableTickets } onSubmit={ onSubmitSpy } />);

    const frontInput = screen.getByLabelText('Gewünschte Anzahl Tickets vorne') as HTMLInputElement;
    const middleInput = screen.getByLabelText('Gewünschte Anzahl Tickets mitte') as HTMLInputElement;
    const backInput = screen.getByLabelText('Gewünschte Anzahl Tickets hinten') as HTMLInputElement;

    userEvent.type(frontInput, '2');
    userEvent.type(middleInput, '3');
    userEvent.type(backInput, '4');
    userEvent.click(screen.getByLabelText('Jetzt kaufen'));

    assert.that(onSubmitSpy.callCount).is.equalTo(1);
    assert.that(frontInput.value).is.equalTo('0');
    assert.that(middleInput.value).is.equalTo('0');
    assert.that(backInput.value).is.equalTo('0');
  });
});
