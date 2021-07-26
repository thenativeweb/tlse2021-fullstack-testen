import { Result } from 'defekt';
import { Area, getAreaSchema } from './Area';
import { JsonSchema, ParseError, Parser } from 'validate-value';

interface Ticket {
  id: string;
  area: Area;
  isAvailable: boolean;
  owner?: string;
}

const getTicketSchema = function (): JsonSchema {
  return {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      area: getAreaSchema(),
      available: { type: 'boolean' },
      owner: { type: 'string', minLength: 1 }
    },
    required: [ 'id', 'area', 'available' ],
    additionalProperties: false
  };
};

const ticketParser = new Parser<Ticket>(getTicketSchema());

const parseTicket = function (data: unknown): Result<Ticket, ParseError> {
  return ticketParser.parse(data, { valueName: 'ticket' });
};

export type {
  Ticket
};
export {
  getTicketSchema,
  parseTicket
};
