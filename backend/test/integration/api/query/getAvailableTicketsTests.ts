import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { connectionOptions } from '../../../shared/containers/connectionOptions';
import { createTicket } from '../../../shared/fixtures/createTicket';
import { Database } from '../../../../lib/storage/Database';
import Express from 'express';
import { getApi } from '../../../../lib/api/getApi';
import { runApiAsServer } from '../../../shared/runApiAsServer';
import { Ticket } from '../../../../lib/domain/types/Ticket';
import { v4 } from 'uuid';

suite('getAvailableTickets', (): void => {
  let api: Express.Application,
      database: Database;

  setup(async (): Promise<void> => {
    database = await Database.create({
      connectionString: connectionOptions.mongoDb.connectionString,
      collectionName: `test-${Math.floor(Math.random() * 50_000)}`
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

  test('returns the counts of available items in the database.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const tickets: Ticket[] = [
      createTicket({ id: v4(), area: Area.back, isAvailable: true }),
      createTicket({ id: v4(), area: Area.back, isAvailable: true }),
      createTicket({ id: v4(), area: Area.back, isAvailable: false }),
      createTicket({ id: v4(), area: Area.center, isAvailable: true }),
      createTicket({ id: v4(), area: Area.center, isAvailable: false }),
      createTicket({ id: v4(), area: Area.center, isAvailable: false }),
      createTicket({ id: v4(), area: Area.front, isAvailable: true }),
      createTicket({ id: v4(), area: Area.front, isAvailable: true }),
      createTicket({ id: v4(), area: Area.front, isAvailable: true })
    ];

    for (const ticket of tickets) {
      (await database.addTicket({ ticket })).unwrapOrThrow();
    }

    const response = await client({
      method: 'GET',
      url: '/query/getAvailableTickets',
      validateStatus (): boolean {
        return true;
      }
    });

    assert.that(response.status).is.equalTo(200);
    assert.that(response.data).is.equalTo({
      front: 3,
      center: 1,
      back: 2
    });
  });
});
