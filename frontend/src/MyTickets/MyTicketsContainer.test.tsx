import { ApiContext } from '../api/TicketsApiContext';
import { assert } from 'assertthat';
import { MyTicketsContainer } from './MyTicketsContainer';
import { TicketCount } from '../types/TicketCount';
import { createMockTicketsApi, createSchedulableResponse } from '../api/MockTicketsApi';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

describe('MyTicketsContainer', (): void => {
  it('shows a loading indicator until the API returend.', async (): Promise<void> => {
    const resolvableResponse = createSchedulableResponse<TicketCount>({
      front: 1,
      back: 2,
      center: 3
    });
    const mockApi = createMockTicketsApi({
      getMyTickets: async (): Promise<TicketCount> => resolvableResponse.promise
    });

    render(
      <ApiContext.Provider value={ mockApi }>
        <MyTicketsContainer />
      </ApiContext.Provider>
    );

    assert.that(screen.getByRole('status')).is.not.null();

    resolvableResponse.resolve();

    await waitForElementToBeRemoved((): HTMLElement[] => screen.queryAllByRole('status'));

    assert.that(screen.getByLabelText('Meine Tickets')).is.not.null();
  });

  it('shows an error message if no valid response.', async (): Promise<void> => {
    const resolvableResponse = createSchedulableResponse<TicketCount>(undefined as unknown as TicketCount);
    const mockApi = createMockTicketsApi({
      getMyTickets: async (): Promise<TicketCount> => resolvableResponse.promise
    });

    render(
      <ApiContext.Provider value={ mockApi }>
        <MyTicketsContainer />
      </ApiContext.Provider>
    );

    resolvableResponse.resolve();

    await waitForElementToBeRemoved((): HTMLElement[] => screen.queryAllByRole('status'));

    assert.that(screen.getByText('Fehler beim Abfragen ihrer Daten. Bitte versuchen sie es später erneut.')).is.not.null();
  });
});
