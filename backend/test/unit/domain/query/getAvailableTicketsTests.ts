import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { createTicket } from 'test/shared/fixtures/createTicket';
import { getAvailableTickets } from '../../../../lib/domain/query/getAvailableTickets';
import { Ticket } from '../../../../lib/domain/types/Ticket';

suite('getAvailableTickets', (): void => {
  test('returns an empty array if no tickets are given.', async (): Promise<void> => {
    const tickets: Ticket[] = [];

    const availableTickets = getAvailableTickets({ tickets });

    assert.that(availableTickets).is.equalTo([]);
  });

  test('returns only tickets that are available.', async (): Promise<void> => {
    const tickets: Ticket[] = [
      createTicket({ area: Area.back, isAvailable: false }),
      createTicket({ area: Area.front, isAvailable: true }),
      createTicket({ area: Area.center, isAvailable: true })
    ];

    const availableTickets = getAvailableTickets({ tickets });

    assert.that(availableTickets).is.equalTo([
      tickets[1],
      tickets[2]
    ]);
  });
});
