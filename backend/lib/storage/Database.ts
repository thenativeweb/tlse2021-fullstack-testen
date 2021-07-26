import { retry } from 'retry-ignore-abort';
import { Ticket } from '../domain/types/Ticket';
import { URL } from 'url';
import { Collection, Db, MongoClient } from 'mongodb';

class Database {
  protected client: MongoClient;

  protected db: Db;

  protected collection: Collection;

  protected constructor ({ client, db, collection }: {
    client: MongoClient;
    db: Db;
    collection: Collection;
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
    const collection = db.collection(collectionName);

    return new Database({
      client,
      db,
      collection
    });
  }

  public async getTickets (): Promise<Ticket[]> {
    const rawTickets = await this.collection.find({}).toArray();

    return rawTickets.map((rawTicket): Ticket => ({
      // eslint-disable-next-line no-underscore-dangle
      id: rawTicket._id,
      area: rawTicket.area,
      isAvailable: rawTicket.isAvailable,
      owner: rawTicket.owner
    }));
  }
}

export {
  Database
};
