import { countTicketsPerArea } from '../../domain/query/countTicketsPerArea';
import { Database } from '../../storage/Database';
import express from 'express';
import { getTicketCountsPerAreaSchema } from '../../domain/types/TicketCountsPerArea';
import { getTicketsOwnedByUser } from '../../domain/query/getTicketsOwnedByUser';
import { isCustomError } from 'defekt';
import * as errors from '../../errors';

const getMyTicketsRoute = {
  path: 'getMyTickets/:userName',
  response: {
    body: getTicketCountsPerAreaSchema()
  },
  getHandler ({ database }: {
    database: Database;
  }): express.RequestHandler {
    return async (req, res): Promise<void> => {
      try {
        const { userName } = req.params;

        const tickets = await database.getTickets();
        const userOwnedTickets = getTicketsOwnedByUser({ userName, tickets });
        const userOwnedTicketCountsPerArea = countTicketsPerArea({ tickets: userOwnedTickets });

        res.status(200).json(userOwnedTicketCountsPerArea);
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
  getMyTicketsRoute
};
