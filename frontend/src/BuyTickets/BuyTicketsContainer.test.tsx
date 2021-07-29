import { ApiContext } from '../api/TicketsApiContext';
import { assert } from 'assertthat';
import { BuyTicketsContainer } from './BuyTicketsContainer';
import { TicketCount } from '../types/TicketCount';
import userEvent from '@testing-library/user-event';
import { createMockTicketsApi, createSchedulableResponse } from '../api/MockTicketsApi';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as sinon from 'sinon';

describe('BuyTicketsContainer', (): void => {
  it('loads and renders the available tickets from the backend.', async (): Promise<void> => {
    const mockApi = createMockTicketsApi({
      getAvailableTickets: async (): Promise<TicketCount> => Promise.resolve({ front: 111, center: 222, back: 333 })
    });

    render(
      <ApiContext.Provider value={ mockApi }>
        <BuyTicketsContainer />
      </ApiContext.Provider>
    );

    assert.that(await screen.findByText('Noch 111 vorne verfügbar.')).is.not.null();
    assert.that(await screen.findByText('Noch 222 mittig verfügbar.')).is.not.null();
    assert.that(await screen.findByText('Noch 333 hinten verfügbar.')).is.not.null();
  });

  it('shows a loading indicator until available tickets are loaded.', async (): Promise<void> => {
    const resolvableResponse = createSchedulableResponse<TicketCount>({
      front: 11,
      back: 22,
      center: 33
    });
    const mockApi = createMockTicketsApi({
      getAvailableTickets: async (): Promise<TicketCount> => resolvableResponse.promise
    });

    render(
      <ApiContext.Provider value={ mockApi }>
        <BuyTicketsContainer />
      </ApiContext.Provider>
    );

    assert.that(screen.getByRole('status')).is.not.null();

    resolvableResponse.resolve();

    await waitForElementToBeRemoved((): HTMLElement[] => screen.queryAllByRole('status'));

    assert.that(screen.getByText('Noch 11 vorne verfügbar.')).is.not.null();
  });

  it('submits the desired ticketCounts to the api on buy event and shows success message.', async (): Promise<void> => {
    const mockedBuyTickets = sinon.fake.resolves(Promise.resolve());
    const mockApi = createMockTicketsApi({
      buyTickets: mockedBuyTickets
    });

    render(
      <ApiContext.Provider value={ mockApi }>
        <BuyTicketsContainer />
      </ApiContext.Provider>
    );

    const buyButton = await screen.findByLabelText('Jetzt kaufen');

    userEvent.type(screen.getByLabelText('Gewünschte Anzahl Tickets vorne'), '2');
    userEvent.click(buyButton);

    assert.that(mockedBuyTickets.calledWith({ front: 2, back: 0, center: 0 } as TicketCount)).is.true();
    assert.that(await screen.findByText('Ticketkauf erfolgreich!')).is.not.null();
  });

  it('reloads the available tickets after buying to show the correct amount.', async (): Promise<void> => {
    const stubedGetAvailableTickets = sinon.stub();

    stubedGetAvailableTickets.onCall(0).resolves({ front: 10, back: 10, center: 10 });
    stubedGetAvailableTickets.onCall(1).resolves({ front: 8, back: 10, center: 10 });

    const mockApi = createMockTicketsApi({
      getAvailableTickets: stubedGetAvailableTickets
    });

    render(
      <ApiContext.Provider value={ mockApi }>
        <BuyTicketsContainer />
      </ApiContext.Provider>
    );

    const buyButton = await screen.findByLabelText('Jetzt kaufen');

    userEvent.type(screen.getByLabelText('Gewünschte Anzahl Tickets vorne'), '2');
    userEvent.click(buyButton);

    assert.that(await screen.findByText('Noch 8 vorne verfügbar.')).is.not.null();
  });
});
