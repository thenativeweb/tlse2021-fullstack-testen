import { Database } from '../../storage/Database';
import express from 'express';
import { getAvailableTickets } from '../../domain/query/getAvailableTickets';
import { getTicketsThatFulfilRequest } from '../../domain/query/getTicketsThatFulfilRequest';
import { isCustomError } from 'defekt';
import { getTicketCountsPerAreaSchema, TicketCountsPerArea } from '../../domain/types/TicketCountsPerArea';
import { JsonSchema, ParseError, Parser } from 'validate-value';
import * as errors from '../../errors';

const buyTicketsRoute = {
  path: 'buyTickets',
  request: {
    body: {
      type: 'object',
      properties: {
        userName: { type: 'string', minLength: 1 },
        requestedTicketCountsPerArea: getTicketCountsPerAreaSchema()
      },
      required: [ 'userName', 'requestedTicketCountsPerArea' ],
      additionalProperties: false
    } as JsonSchema
  },
  getHandler ({ database }: {
    database: Database;
  }): express.RequestHandler {
    const requestBodyParser = new Parser<{
      userName: string;
      requestedTicketCountsPerArea: TicketCountsPerArea;
    }>(buyTicketsRoute.request.body);

    return async (req, res): Promise<void> => {
      try {
        const parseBodyResult = requestBodyParser.parse(req.body);

        if (parseBodyResult.hasError()) {
          throw parseBodyResult.error;
        }

        const { userName, requestedTicketCountsPerArea } = parseBodyResult.value;

        const tickets = await database.getTickets();
        const availableTickets = getAvailableTickets({ tickets });

        const ticketsThatFulfilRequestResult = getTicketsThatFulfilRequest({ availableTickets, requestedTicketCountsPerArea });

        if (ticketsThatFulfilRequestResult.hasError()) {
          throw ticketsThatFulfilRequestResult.error;
        }

        (await database.markTicketsOwned({
          owner: userName,
          tickets: ticketsThatFulfilRequestResult.value
        })).unwrapOrThrow();
        res.status(200).send();
      } catch (ex: unknown) {
        const error = isCustomError(ex) ? ex : new errors.InternalServerError({ cause: ex });

        switch (error.code) {
          case errors.CannotFulfilBuyRequest.code:
          case errors.TicketNotAvailable.code: {
            res.status(409).json(error);

            break;
          }
          case ParseError.code: {
            res.status(400).json(error);

            break;
          }
          default: {
            res.status(500).json(error);
          }
        }
      }
    };
  }
};

export {
  buyTicketsRoute
};
