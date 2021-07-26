import { Database } from '../storage/Database';
import express from 'express';
import { getAvailableTicketsRoute } from './query/getAvailableTickets';

const getApi = function ({ database }: {
  database: Database;
}): express.Application {
  const app = express();

  app.get(
    `/query/${getAvailableTicketsRoute.path}`,
    getAvailableTicketsRoute.getHandler({ database })
  );

  return app;
};

export {
  getApi
};
