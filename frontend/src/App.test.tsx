import App from './App';
import { assert } from 'assertthat';
import { render, screen } from '@testing-library/react';

describe('App', (): void => {
  it('renders the headline.', async (): Promise<void> => {
    render(
      <App />
    );

    assert.that(screen.getByText('Ticketeer')).is.not.null();
  });
});
