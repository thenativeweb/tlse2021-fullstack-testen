import { defekt } from 'defekt';

class InternalServerError extends defekt({ code: 'InternalServerError' }) {}
class TicketIdAlreadyExists extends defekt({ code: 'TicketIdAlreadyExists' }) {}

export {
  InternalServerError,
  TicketIdAlreadyExists
};
