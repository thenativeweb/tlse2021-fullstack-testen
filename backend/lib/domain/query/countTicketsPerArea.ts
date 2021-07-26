import { Area } from '../types/Area';
import { Ticket } from '../types/Ticket';
import { TicketCountsPerArea } from '../types/TicketCountsPerArea';

const countTicketsPerArea = function ({ tickets }: {
  tickets: readonly Ticket[];
}): TicketCountsPerArea {
  const ticketCounts = Object.fromEntries(
    Object.values(Area).
      map((area): [Area, number] => [ area, 0 ])
  ) as TicketCountsPerArea;

  for (const ticket of tickets) {
    ticketCounts[ticket.area] += 1;
  }

  return ticketCounts;
};

export {
  countTicketsPerArea
};
