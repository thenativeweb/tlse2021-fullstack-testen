import { Database } from '../../storage/Database';
import express from 'express';
import { getAvailableTickets } from '../../domain/query/getAvailableTickets';
import { getBookableTickets } from '../../domain/query/getBookableTickets';
import { isCustomError } from 'defekt';
import { getTicketCountsPerAreaSchema, TicketCountsPerArea } from '../../domain/types/TicketCountsPerArea';
import { JsonSchema, ParseError, Parser } from 'validate-value';
import * as errors from '../../errors';

const bookTicketsRoute = {
  path: 'bookTickets',
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
    }>(bookTicketsRoute.request.body);

    return async (req, res): Promise<void> => {
      try {
        const parseBodyResult = requestBodyParser.parse(req.body);

        if (parseBodyResult.hasError()) {
          throw parseBodyResult.error;
        }

        const { userName, requestedTicketCountsPerArea } = parseBodyResult.value;

        const tickets = await database.getTickets();
        const availableTickets = getAvailableTickets({ tickets });

        const bookableTicketsResult = getBookableTickets({ availableTickets, requestedTicketCountsPerArea });

        if (bookableTicketsResult.hasError()) {
          throw bookableTicketsResult.error;
        }

        (await database.markTicketsBooked({
          owner: userName,
          tickets: bookableTicketsResult.value
        })).unwrapOrThrow();
        res.status(200).send();
      } catch (ex: unknown) {
        const error = isCustomError(ex) ? ex : new errors.InternalServerError({ cause: ex });

        switch (error.code) {
          case errors.NotEnoughBookableTicketsAvailable.code:
          case errors.TicketNotBookable.code: {
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
  bookTicketsRoute
};
