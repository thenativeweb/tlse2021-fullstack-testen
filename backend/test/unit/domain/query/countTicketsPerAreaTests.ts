import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { countTicketsPerArea } from '../../../../lib/domain/query/countTicketsPerArea';
import crypto from 'crypto';
import { Ticket } from '../../../../lib/domain/types/Ticket';

suite('countTicketsPerArea', (): void => {
  test('returns all zeros if no tickets are given.', async (): Promise<void> => {
    const tickets: Ticket[] = [];

    const ticketCountsPerArea = countTicketsPerArea({ tickets });

    assert.that(ticketCountsPerArea).is.equalTo({
      front: 0,
      center: 0,
      back: 0
    });
  });

  test('counts the tickets per area.', async (): Promise<void> => {
    const tickets: Ticket[] = [
      { id: crypto.randomUUID(), area: Area.back, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.center, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.back, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true }
    ];

    const ticketCountsPerArea = countTicketsPerArea({ tickets });

    assert.that(ticketCountsPerArea).is.equalTo({
      front: 2,
      center: 1,
      back: 2
    });
  });
});
