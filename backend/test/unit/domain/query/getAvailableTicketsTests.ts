import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import crypto from 'crypto';
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
      { id: crypto.randomUUID(), area: Area.back, isAvailable: false },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.center, isAvailable: true }
    ];

    const availableTickets = getAvailableTickets({ tickets });

    assert.that(availableTickets).is.equalTo([
      tickets[1],
      tickets[2]
    ]);
  });
});
