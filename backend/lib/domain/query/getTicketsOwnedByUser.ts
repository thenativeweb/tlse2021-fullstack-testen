import { Ticket } from '../types/Ticket';

const getTicketsOwnedByUser = function ({ userName, tickets }: {
  userName: string;
  tickets: Ticket[];
}): Ticket[] {
  return tickets.filter(
    (ticket): boolean => ticket.owner === userName
  );
};

export {
  getTicketsOwnedByUser
};
