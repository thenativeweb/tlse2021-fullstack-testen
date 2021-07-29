import { Area } from './types/Area';
import crypto from 'crypto';
import { Database } from '../storage/Database';

const prefillDatabaseWithTickets = async function ({ database }: {
  database: Database;
}): Promise<void> {
  for (const area of Object.values(Area)) {
    for (let i = 0; i < 20; i++) {
      await database.addTicket({
        ticket: {
          id: crypto.randomUUID(),
          area,
          isAvailable: true
        }
      });
    }
  }
};

export {
  prefillDatabaseWithTickets
};
