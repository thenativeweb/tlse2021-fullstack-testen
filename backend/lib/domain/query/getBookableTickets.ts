import { Ticket } from '../types/Ticket';
import { TicketCountsPerArea } from '../types/TicketCountsPerArea';
import { error, Result, value } from 'defekt';
import * as errors from '../../errors';

const getBookableTickets = function ({
  availableTickets,
  requestedTicketCountsPerArea
}: {
  availableTickets: Ticket[];
  requestedTicketCountsPerArea: TicketCountsPerArea;
}): Result<Ticket[], errors.NotEnoughBookableTicketsAvailable> {
  const bookableTickets = [];
  const outstandingTicketCountsPerArea = {
    ...requestedTicketCountsPerArea
  };

  for (const ticket of availableTickets) {
    if (outstandingTicketCountsPerArea[ticket.area] > 0) {
      bookableTickets.push(ticket);
      outstandingTicketCountsPerArea[ticket.area] -= 1;
    }
  }

  if (
    Object.
      values(outstandingTicketCountsPerArea).
      some((count): boolean => count !== 0)
  ) {
    return error(new errors.NotEnoughBookableTicketsAvailable());
  }

  return value(bookableTickets);
};

export {
  getBookableTickets
};
