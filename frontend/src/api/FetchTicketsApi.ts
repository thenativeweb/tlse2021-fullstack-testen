import { TicketCount } from '../types/TicketCount';
import { TicketsApi } from './TicketsApi';

const createFetchTicketsApi = (host: string): TicketsApi => ({
  async buyTickets (tickets: TicketCount): Promise<void> {
    const response = await fetch(`${host}/buyTickets`, {
      method: 'POST',
      body: JSON.stringify(tickets)
    });

    if (!response.ok) {
      throw new Error(`Error on API Call. Received status ${response.status}.`);
    }
  },
  async getAvailableTickets (): Promise<TicketCount> {
    const response = await fetch(`${host}/getAvailableTickets`);

    return await response.json();
  },
  async getMyTickets (): Promise<TicketCount> {
    const response = await fetch(`${host}/getMyTickets`);

    return await response.json();
  }
});

export {
  createFetchTicketsApi
};
