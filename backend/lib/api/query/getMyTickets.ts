import { Database } from '../../storage/Database';
import express from 'express';
import { getTicketSchema } from '../../domain/types/Ticket';
import { isCustomError } from 'defekt';
import { JsonSchema } from 'validate-value';
import * as errors from '../../errors';

const getMyTicketsRoute = {
  path: 'getMyTickets/:userName',
  response: {
    body: {
      type: 'array',
      items: getTicketSchema()
    } as JsonSchema
  },
  getHandler ({ database }: {
    database: Database;
  }): express.RequestHandler {
    return async (req, res): Promise<void> => {
      try {
        // TODO: implement route
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
