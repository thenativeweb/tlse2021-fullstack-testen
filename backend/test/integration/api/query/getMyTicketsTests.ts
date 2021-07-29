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

suite('getMyTickets', (): void => {
  let api: Express.Application,
      database: Database;

  const userName = 'testUser';

  setup(async (): Promise<void> => {
    database = await Database.create({
      connectionString: connectionOptions.mongoDb.connectionString,
      collectionName: `test-${Math.floor(Math.random() * 50_000)}`
    });
    api = getApi({ database });
  });

  test('returns 0 for all areas if no tickets have been bought.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const response = await client({
      method: 'GET',
      url: `/query/getMyTickets/${userName}`,
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

  test('returns the bought ticket counts.', async (): Promise<void> => {
    const { client } = await runApiAsServer({ api });

    const tickets: Ticket[] = [
      createTicket({ id: v4(), area: Area.back, isAvailable: true }),
      createTicket({ id: v4(), area: Area.back, isAvailable: true }),
      createTicket({ id: v4(), area: Area.back, isAvailable: true }),
      createTicket({ id: v4(), area: Area.center, isAvailable: true }),
      createTicket({ id: v4(), area: Area.center, isAvailable: true }),
      createTicket({ id: v4(), area: Area.center, isAvailable: true }),
      createTicket({ id: v4(), area: Area.front, isAvailable: true }),
      createTicket({ id: v4(), area: Area.front, isAvailable: true }),
      createTicket({ id: v4(), area: Area.front, isAvailable: true })
    ];

    for (const ticket of tickets) {
      (await database.addTicket({ ticket })).unwrapOrThrow();
    }

    await client({
      method: 'POST',
      url: `/command/buyTickets`,
      data: {
        userName,
        requestedTicketCountsPerArea: {
          front: 1,
          center: 0,
          back: 2
        }
      }
    });
    await client({
      method: 'POST',
      url: `/command/buyTickets`,
      data: {
        userName,
        requestedTicketCountsPerArea: {
          front: 0,
          center: 3,
          back: 0
        }
      }
    });

    const response = await client({
      method: 'GET',
      url: `/query/getMyTickets/${userName}`,
      validateStatus (): boolean {
        return true;
      }
    });

    assert.that(response.status).is.equalTo(200);
    assert.that(response.data).is.equalTo({
      front: 1,
      center: 3,
      back: 2
    });
  });
});
