import { buyTicketsRoute } from './command/buyTickets';
import cors from 'cors';
import { Database } from '../storage/Database';
import express from 'express';
import { getAvailableTicketsRoute } from './query/getAvailableTickets';

const getApi = function ({ database }: {
  database: Database;
}): express.Application {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get(
    `/query/${getAvailableTicketsRoute.path}`,
    getAvailableTicketsRoute.getHandler({ database })
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
