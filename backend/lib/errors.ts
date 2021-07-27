import { defekt } from 'defekt';

class CannotFulfilBuyRequest extends defekt({ code: 'CannotFulfilBuyRequest' }) {}
class InternalServerError extends defekt({ code: 'InternalServerError' }) {}
class TicketIdAlreadyExists extends defekt({ code: 'TicketIdAlreadyExists' }) {}
class TicketNotAvailable extends defekt({ code: 'TicketNotAvailable' }) {}

export {
  CannotFulfilBuyRequest,
  InternalServerError,
  TicketIdAlreadyExists,
  TicketNotAvailable
};
