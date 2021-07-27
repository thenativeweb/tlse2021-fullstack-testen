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
      const ticket: Ticket = { id: crypto.randomUUID(), area: Area.center, isAvailable: true };

      const addTicketResult = await database.addTicket({ ticket });

      assert.that(addTicketResult).is.aValue();

      const tickets = await database.getTickets();

      assert.that(tickets).is.equalTo([
        ticket
      ]);
    });

    test('fails if a ticket id is already in use.', async (): Promise<void> => {
      const ticket: Ticket = { id: crypto.randomUUID(), area: Area.center, isAvailable: true };

      await database.addTicket({ ticket });

      const addTicketResult = await database.addTicket({ ticket });

      assert.that(addTicketResult).is.anErrorWithMessage('Ticket id already exists.');
    });
  });

  suite('markTicketsBooked', (): void => {
    test('fails if one of the requested tickets does not exist.', async (): Promise<void> => {
      const markTicketsBookedResult = await database.markTicketsBooked({
        owner: 'foobar',
        tickets: [
          { id: crypto.randomUUID(), area: Area.front, isAvailable: true }
        ]
      });

      assert.that(markTicketsBookedResult).is.anErrorWithMessage('Ticket not bookable.');
    });

    test('fails if one of the tickets is not available.', async (): Promise<void> => {
      const tickets: Ticket[] = [
        { id: crypto.randomUUID(), area: Area.front, isAvailable: false, owner: 'notme' }
      ];

      (await database.addTicket({ ticket: tickets[0] })).unwrapOrThrow();

      const markTicketsBookedResult = await database.markTicketsBooked({
        owner: 'foobar',
        tickets: [
          tickets[0]
        ]
      });

      assert.that(markTicketsBookedResult).is.anErrorWithMessage('Ticket not bookable.');
    });

    test('marks all tickets booked and sets their owner.', async (): Promise<void> => {
      const tickets: Ticket[] = [
        { id: crypto.randomUUID(), area: Area.back, isAvailable: true },
        { id: crypto.randomUUID(), area: Area.back, isAvailable: true },
        { id: crypto.randomUUID(), area: Area.back, isAvailable: false },
        { id: crypto.randomUUID(), area: Area.center, isAvailable: true },
        { id: crypto.randomUUID(), area: Area.center, isAvailable: false },
        { id: crypto.randomUUID(), area: Area.center, isAvailable: false },
        { id: crypto.randomUUID(), area: Area.front, isAvailable: true },
        { id: crypto.randomUUID(), area: Area.front, isAvailable: true },
        { id: crypto.randomUUID(), area: Area.front, isAvailable: true }
      ];

      for (const ticket of tickets) {
        (await database.addTicket({ ticket })).unwrapOrThrow();
      }

      const markTicketsBookedResult = await database.markTicketsBooked({
        owner: 'foobar',
        tickets: [
          tickets[0],
          tickets[1],
          tickets[3]
        ]
      });

      assert.that(markTicketsBookedResult).is.aValue();

      const updatedTickets = await database.getTickets();

      assert.that(updatedTickets).is.containingAllOf([
        { ...tickets[0], isAvailable: false, owner: 'foobar' },
        { ...tickets[1], isAvailable: false, owner: 'foobar' },
        { ...tickets[3], isAvailable: false, owner: 'foobar' }
      ]);
    });
  });
});
