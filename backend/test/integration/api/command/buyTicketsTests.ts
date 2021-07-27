import { Area } from '../../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { connectionOptions } from '../../../shared/containers/connectionOptions';
import crypto from 'crypto';
import { Database } from '../../../../lib/storage/Database';
import Express from 'express';
import { getApi } from '../../../../lib/api/getApi';
import { runApiAsServer } from '../../../shared/runApiAsServer';
import { Ticket } from '../../../../lib/domain/types/Ticket';

suite('buyTickets', (): void => {
  let api: Express.Application,
      database: Database;

  setup(async (): Promise<void> => {
    database = await Database.create({
      connectionString: connectionOptions.mongoDb.connectionString,
      collectionName: `test-${crypto.randomInt(50_000)}`
    });
    api = getApi({ database });
  });

  test('returns status 400 if the request body is malformed.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const response = await client({
      method: 'POST',
      url: '/command/buyTickets',
      data: { foo: 'bar' },
      validateStatus (): boolean {
        return true;
      }
    });

    assert.that(response.status).is.equalTo(400);
  });

  test('returns status 409 if not enough tickets are available to fulfil the buy request.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const userName = 'foobar';

    const response = await client({
      method: 'POST',
      url: '/command/buyTickets',
      data: {
        userName,
        requestedTicketCountsPerArea: {
          front: 2,
          center: 0,
          back: 0
        }
      },
      validateStatus (): boolean {
        return true;
      }
    });

    assert.that(response.status).is.equalTo(409);
  });

  test('returns status 200 if the request was successful.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const tickets: Ticket[] = [
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true },
      { id: crypto.randomUUID(), area: Area.front, isAvailable: true }
    ];

    for (const ticket of tickets) {
      (await database.addTicket({ ticket })).unwrapOrThrow();
    }

    const userName = 'foobar';

    const response = await client({
      method: 'POST',
      url: '/command/buyTickets',
      data: {
        userName,
        requestedTicketCountsPerArea: {
          front: 2,
          center: 0,
          back: 0
        }
      },
      validateStatus (): boolean {
        return true;
      }
    });

    assert.that(response.status).is.equalTo(200);
  });
});
