import { Area } from '../../../lib/domain/types/Area';
import { assert } from 'assertthat';
import { connectionOptions } from '../../shared/containers/connectionOptions';
import crypto from 'crypto';
import { Database } from '../../../lib/storage/Database';
import { Ticket } from '../../../lib/domain/types/Ticket';

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

  suite('addTicket', (): void => {
    test('adds a ticket to the database.', async (): Promise<void> => {
      const ticket: Ticket = {
        id: crypto.randomUUID(),
        area: Area.center,
        isAvailable: true
      };

      const addTicketResult = await database.addTicket({ ticket });

      assert.that(addTicketResult).is.aValue();

      const tickets = await database.getTickets();

      assert.that(tickets).is.equalTo([
        ticket
      ]);
    });

    test('fails if a ticket id is already in use.', async (): Promise<void> => {
      const ticket: Ticket = {
        id: crypto.randomUUID(),
        area: Area.center,
        isAvailable: true
      };

      await database.addTicket({ ticket });

      const addTicketResult = await database.addTicket({ ticket });

      assert.that(addTicketResult).is.anErrorWithMessage('Ticket id already exists.');
    });
  });
});
