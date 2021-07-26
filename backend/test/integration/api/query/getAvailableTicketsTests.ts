import { assert } from 'assertthat';
import { connectionOptions } from '../../../shared/containers/connectionOptions';
import crypto from 'crypto';
import { Database } from '../../../../lib/storage/Database';
import Express from 'express';
import { getApi } from '../../../../lib/api/getApi';
import { runApiAsServer } from '../../../shared/runApiAsServer';

suite('getAvailableTickets', (): void => {
  let api: Express.Application,
      database: Database;

  setup(async (): Promise<void> => {
    database = await Database.create({
      connectionString: connectionOptions.mongoDb.connectionString,
      collectionName: `test-${crypto.randomInt(50_000)}`
    });
    api = getApi({ database });
  });

  test('returns 0 for all areas if no tickets exist in the database.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const response = await client({
      method: 'GET',
      url: '/query/getAvailableTickets',
      validateStatus (): boolean {
        return true;
      }
    });

    assert.that(response.status).is.equalTo(200);
    assert.that(response.data).is.equalTo({
      front: 0,
      center: 0,
      back: 0
    });
  });
});
