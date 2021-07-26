import { Ticket } from '../types/Ticket';

const getAvailableTickets = function ({ tickets }: {
  tickets: Ticket[];
}): Ticket[] {
  return tickets.
    filter((ticket): boolean => ticket.isAvailable);
};

export {
  getAvailableTickets
};
