import { retry } from 'retry-ignore-abort';
import { Ticket } from '../domain/types/Ticket';
import { URL } from 'url';
import { Collection, Db, MongoClient } from 'mongodb';
import { error, Result, value } from 'defekt';
import * as errors from '../errors';

class Database {
  protected client: MongoClient;

  protected db: Db;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected collection: Collection<Omit<Ticket, 'id'> & { _id: string }>;

  protected constructor ({ client, db, collection }: {
    client: MongoClient;
    db: Db;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    collection: Collection<Omit<Ticket, 'id'> & { _id: string }>;
  }) {
    this.client = client;
    this.db = db;
    this.collection = collection;
  }

  public static async create ({ connectionString, collectionName }: {
    connectionString: string;
    collectionName: string;
  }): Promise<Database> {
    const client = await retry(async (): Promise<MongoClient> => {
      const connection = await MongoClient.connect(
        connectionString,
        // eslint-disable-next-line id-length
        { w: 1 }
      );

      return connection;
    });

    const { pathname } = new URL(connectionString);

    const databaseName = pathname.slice(1);
    const db = client.db(databaseName);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const collection = db.collection<Omit<Ticket, 'id'> & { _id: string }>(collectionName);

    return new Database({
      client,
      db,
      collection
    });
  }

  public async getTickets (): Promise<Ticket[]> {
    const rawTickets = await this.collection.find({}).toArray();

    return rawTickets.map((rawTicket): Ticket => {
      const ticket: Ticket = {
        // eslint-disable-next-line no-underscore-dangle
        id: rawTicket._id,
        area: rawTicket.area,
        isAvailable: rawTicket.isAvailable
      };

      if (rawTicket.owner) {
        ticket.owner = rawTicket.owner;
      }

      return ticket;
    });
  }

  public async addTicket ({ ticket }: {
    ticket: Ticket;
  }): Promise<Result<undefined, errors.TicketIdAlreadyExists>> {
    try {
      const document: any = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        _id: ticket.id,
        area: ticket.area,
        isAvailable: ticket.isAvailable
      };

      if (ticket.owner) {
        document.owner = ticket.owner;
      }

      await this.collection.insertOne(document);

      return value();
    } catch {
      return error(new errors.TicketIdAlreadyExists());
    }
  }
}

export {
  Database
};
