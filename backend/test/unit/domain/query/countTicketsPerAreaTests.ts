import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { countTicketsPerArea } from '../../../../lib/domain/query/countTicketsPerArea';
import { Ticket } from '../../../../lib/domain/types/Ticket';
import { v4 } from 'uuid';

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
      { id: v4(), area: Area.back, isAvailable: true },
      { id: v4(), area: Area.front, isAvailable: true },
      { id: v4(), area: Area.center, isAvailable: true },
      { id: v4(), area: Area.back, isAvailable: true },
      { id: v4(), area: Area.front, isAvailable: true }
    ];

    const ticketCountsPerArea = countTicketsPerArea({ tickets });

    assert.that(ticketCountsPerArea).is.equalTo({
      front: 2,
      center: 1,
      back: 2
    });
  });
});
