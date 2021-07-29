import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { countTicketsPerArea } from '../../../../lib/domain/query/countTicketsPerArea';
import { createTicket } from 'test/shared/fixtures/createTicket';
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
      createTicket({ area: Area.back }),
      createTicket({ area: Area.front }),
      createTicket({ area: Area.center }),
      createTicket({ area: Area.back }),
      createTicket({ area: Area.front })
    ];

    const ticketCountsPerArea = countTicketsPerArea({ tickets });

    assert.that(ticketCountsPerArea).is.equalTo({
      front: 2,
      center: 1,
      back: 2
    });
  });
});
