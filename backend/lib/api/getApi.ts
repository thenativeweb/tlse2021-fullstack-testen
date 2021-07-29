import { buyTicketsRoute } from './command/buyTickets';
import cors from 'cors';
import { Database } from '../storage/Database';
import express from 'express';
import { getAvailableTicketsRoute } from './query/getAvailableTickets';
import { getMiddleware as getLoggingMiddleware } from 'flaschenpost';
import { getMyTicketsRoute } from './query/getMyTickets';

const getApi = function ({ database }: {
  database: Database;
}): express.Application {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(getLoggingMiddleware());

  app.get(
    `/query/${getAvailableTicketsRoute.path}`,
    getAvailableTicketsRoute.getHandler({ database })
  );
  app.get(
    `/query/${getMyTicketsRoute.path}`,
    getMyTicketsRoute.getHandler({ database })
  );

  app.post(
    `/command/${buyTicketsRoute.path}`,
    buyTicketsRoute.getHandler({ database })
  );

  return app;
};

export {
  getApi
};
