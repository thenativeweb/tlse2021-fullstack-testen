import { Area } from './types/Area';
import { Database } from '../storage/Database';
import { v4 } from 'uuid';

const prefillDatabaseWithTickets = async function ({ database }: {
  database: Database;
}): Promise<void> {
  for (const area of Object.values(Area)) {
    for (let i = 0; i < 20; i++) {
      await database.addTicket({
        ticket: {
          id: v4(),
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
