import { assert } from 'assertthat';
import { connectionOptions } from '../../shared/containers/connectionOptions';
import crypto from 'crypto';
import { Database } from '../../../lib/storage/Database';

suite('Database', (): void => {
  let database: Database;

  setup(async (): Promise<void> => {
    database = await Database.create({
      connectionString: connectionOptions.mongoDb.connectionString,
      collectionName: `test-${crypto.randomInt(50_000)}`
    });
  });

  suite('getTicket', (): void => {
    test('returns an empty array if no tickets exist in the database.', async (): Promise<void> => {
      const tickets = await database.getTickets();

      assert.that(tickets).is.equalTo([]);
    });
  });
});
