import { Database } from '../storage/Database';
import { flaschenpost } from 'flaschenpost';
import { getApi } from '../api/getApi';
import http from 'http';
import { processenv } from 'processenv';

const logger = flaschenpost.getLogger();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  const mongoDbConnectionString = processenv(
    'MONGODB_CONNECTION_STRING',
    'mongodb://webinar:webinar@localhost:27017/webinar'
  ) as string;
  const mongoDbCollectionName = processenv(
    'MONGODB_COLLECTION_NAME',
    'webinar'
  ) as string;

  const database = await Database.create({
    connectionString: mongoDbConnectionString,
    collectionName: mongoDbCollectionName
  });
  const api = getApi({ database });
  const server = http.createServer(api);

  server.listen(8_080, (): void => {
    logger.info('The server is running.');
  });
})();
