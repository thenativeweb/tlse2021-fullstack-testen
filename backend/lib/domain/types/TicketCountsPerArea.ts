import { Area } from './Area';
import { JsonSchema } from 'validate-value';

type TicketCountsPerArea = Record<Area, number>;

const getTicketCountsPerAreaSchema = function (): JsonSchema {
  return {
    type: 'object',
    properties: Object.fromEntries(
      Object.values(Area).
        map((area): [string, JsonSchema] =>
          [ area, { type: 'number', minimum: 0 }])
    ),
    required: Object.values(Area),
    additionalProperties: false
  };
};

export type {
  TicketCountsPerArea
};
export {
  getTicketCountsPerAreaSchema
};
