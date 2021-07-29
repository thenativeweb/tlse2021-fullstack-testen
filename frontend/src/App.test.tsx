import { ApiContext } from './api/TicketsApiContext';
import App from './App';
import { assert } from 'assertthat';
import { createMockTicketsApi } from './api/MockTicketsApi';
import { render, screen } from '@testing-library/react';

describe('App', (): void => {
  it('renders the headline.', async (): Promise<void> => {
    render(
      <ApiContext.Provider value={ createMockTicketsApi() }>
        <App />
      </ApiContext.Provider>
    );

    assert.that(screen.getByText('Ticketeer')).is.not.null();
  });
});
