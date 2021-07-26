import { TicketCount } from '../types/TicketCount';

interface TicketsApi {
  getAvailableTickets: () => Promise<TicketCount>;
  buyTickets: (tickets: TicketCount) => Promise<void>;
  getMyTickets: () => Promise<TicketCount>;
}

export {
  TicketsApi
};
