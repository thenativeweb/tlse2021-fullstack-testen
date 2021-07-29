import { assert } from 'assertthat';
import { createTicket } from 'test/shared/fixtures/createTicket';
import { getTicketsOwnedByUser } from 'lib/domain/query/getTicketsOwnedByUser';

suite('getTicketsOwnedByUser', (): void => {
  test('returns empty array when no tickets given.', async (): Promise<void> => {
    const input = { userName: 'test', tickets: []};

    const result = getTicketsOwnedByUser(input);

    assert.that(result).is.empty();
  });

  test('returns owend ticket.', async (): Promise<void> => {
    const ownedTicket = createTicket({ owner: 'owningUser', isAvailable: false });
    const input = { userName: 'owningUser', tickets: [ ownedTicket ]};

    const result = getTicketsOwnedByUser(input);

    assert.that(result.length).is.equalTo(1);
    assert.that(result[0]).is.equalTo(ownedTicket);
  });

  test('filters out tickets not belonging to the user.', async (): Promise<void> => {
    const ownedTicket = createTicket({ owner: 'owningUser', isAvailable: false });
    const notOwnedTicket = createTicket({ owner: 'anotherUser', isAvailable: false });
    const input = { userName: 'owningUser', tickets: [ ownedTicket, notOwnedTicket ]};

    const result = getTicketsOwnedByUser(input);

    assert.that(result.length).is.equalTo(1);
    assert.that(result[0]).is.equalTo(ownedTicket);
  });
});
