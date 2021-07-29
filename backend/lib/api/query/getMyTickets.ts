import { Database } from '../../storage/Database';
import express from 'express';
import { getTicketCountsPerAreaSchema } from '../../domain/types/TicketCountsPerArea';
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
        // TODO: implement route

        res.status(200).json({});
      } catch (ex: unknown) {
        const error = isCustomError(ex) ? ex : new errors.InternalServerError({ cause: ex });

        switch (error.code) {
          // TODO: handle potential errors
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
