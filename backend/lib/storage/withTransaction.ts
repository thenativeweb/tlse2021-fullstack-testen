import { ClientSession, MongoClient, ReadConcern, ReadPreference } from 'mongodb';

const withTransaction = async function<TResult = void> ({ client, fn }: {
  client: MongoClient;
  fn: ({ session }: { session: ClientSession }) => Promise<TResult>;
}): Promise<TResult> {
  let result: TResult;

  await client.withSession({
    defaultTransactionOptions: {
      readPreference: new ReadPreference('primary'),
      readConcern: ReadConcern.fromOptions({ level: 'local' }),
      // eslint-disable-next-line id-length
      writeConcern: { w: 'majority' }
    }
  }, async (session): Promise<void> => {
    await session.withTransaction(async (): Promise<void> => {
      result = await fn({ session });
    });
  });

  return result!;
};

export { withTransaction };
