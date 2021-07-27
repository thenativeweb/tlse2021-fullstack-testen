import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import crypto from 'crypto';
import { getTicketsThatFulfilRequest } from '../../../../lib/domain/query/getTicketsThatFulfilRequest';
import { Ticket } from '../../../../lib/domain/types/Ticket';
import { TicketCountsPerArea } from '../../../../lib/domain/types/TicketCountsPerArea';

suite('getTicketsThatFulfilRequest', (): void => {
  test('returns an empty array if no tickets are requested and no tickets are available.', async (): Promise<void> => {
    const availableTickets: Ticket[] = [];
    const requestedTicketCountsPerArea: TicketCountsPerArea = {
      front: 0,
      center: 0,
      back: 0
    };

    const ticketsThatFulfilRequestResult = getTicketsThatFulfilRequest({
      availableTickets,
      requestedTicketCountsPerArea
    });

    assert.that(
      ticketsThatFulfilRequestResult.unwrapOrThrow()
    ).is.equalTo([]);
  });

  test('returns an error if not enough tickets are available.', async (): Promise<void> => {
    const availableTickets: Ticket[] = [];
    const requestedTicketCountsPerArea: TicketCountsPerArea = {
      front: 2,
      center: 1,
      back: 0
    };

    const ticketsThatFulfilRequestResult = getTicketsThatFulfilRequest({
      availableTickets,
      requestedTicketCountsPerArea
    });

    assert.that(ticketsThatFulfilRequestResult).is.anErrorWithMessage('Cannot fulfil buy request.');
  });

  test('returns an array of individual tickets that fulfills the buy request.', async (): Promise<void> => {
    const availableTickets: Ticket[] = [
      { id: crypto.randomUUID(), area: Area.back, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.center, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true }
    ];
    const requestedTicketCountsPerArea: TicketCountsPerArea = {
      front: 2,
      center: 1,
      back: 0
    };

    const ticketsThatFulfilRequestResult = getTicketsThatFulfilRequest({
      availableTickets,
      requestedTicketCountsPerArea
    });

    assert.that(
      ticketsThatFulfilRequestResult.unwrapOrThrow()
    ).is.containingAllOf([
      availableTickets[1],
      availableTickets[2],
      availableTickets[3]
    ]);
    assert.that(
      ticketsThatFulfilRequestResult.unwrapOrThrow().length
    ).is.equalTo(3);
  });

  test('does not verify wether a ticket is available.', async (): Promise<void> => {
    const availableTickets: Ticket[] = [
      { id: crypto.randomUUID(), area: Area.back, isAvailable: false },
      { id: crypto.randomUUID(), area: Area.center, isAvailable: false },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: false },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: false }
    ];
    const requestedTicketCountsPerArea: TicketCountsPerArea = {
      front: 2,
      center: 1,
      back: 0
    };

    const ticketsThatFulfilRequestResult = getTicketsThatFulfilRequest({
      availableTickets,
      requestedTicketCountsPerArea
    });

    assert.that(
      ticketsThatFulfilRequestResult.unwrapOrThrow()
    ).is.containingAllOf([
      availableTickets[1],
      availableTickets[2],
      availableTickets[3]
    ]);
    assert.that(
      ticketsThatFulfilRequestResult.unwrapOrThrow().length
    ).is.equalTo(3);
  });
});
