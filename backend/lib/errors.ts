import { defekt } from 'defekt';

class InternalServerError extends defekt({ code: 'InternalServerError' }) {}
class NotEnoughBookableTicketsAvailable extends defekt({ code: 'NotEnoughBookableTicketsAvailable' }) {}
class TicketNotBookable extends defekt({ code: 'TicketNotBookable' }) {}
class TicketIdAlreadyExists extends defekt({ code: 'TicketIdAlreadyExists' }) {}

export {
  InternalServerError,
  NotEnoughBookableTicketsAvailable,
  TicketNotBookable,
  TicketIdAlreadyExists
};
