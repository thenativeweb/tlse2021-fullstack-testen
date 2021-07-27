import { countTicketsPerArea } from '../../domain/query/countTicketsPerArea';
import { Database } from '../../storage/Database';
import express from 'express';
import { getAvailableTickets } from '../../domain/query/getAvailableTickets';
import { getTicketCountsPerAreaSchema } from '../../domain/types/TicketCountsPerArea';
import { isCustomError } from 'defekt';
import { Parser } from 'validate-value';
import * as errors from '../../errors';

const getAvailableTicketsRoute = {
  path: 'getAvailableTickets',
  response: {
    body: getTicketCountsPerAreaSchema()
  },
  getHandler ({ database }: {
    database: Database;
  }): express.RequestHandler {
    const responseBodyParser = new Parser(getAvailableTicketsRoute.response.body);

    return async (req, res): Promise<void> => {
      try {
        const tickets = await database.getTickets();
        const availableTickets = getAvailableTickets({ tickets });
        const availableTicketCounts = countTicketsPerArea({ tickets: availableTickets });

        if (!responseBodyParser.isValid(availableTicketCounts)) {
          throw new errors.InternalServerError({
            message: 'Failed to validate output data.'
          });
        }

        res.json(availableTicketCounts);
      } catch (ex: unknown) {
        const error = isCustomError(ex) ? ex : new errors.InternalServerError({ cause: ex });

        switch (error.code) {
          default: {
            res.status(500).json(error);
          }
        }
      }
    };
  }
};

export {
  getAvailableTicketsRoute
};
