import { defekt } from 'defekt';

class InternalServerError extends defekt({ code: 'InternalServerError' }) {}

export {
  InternalServerError
};
