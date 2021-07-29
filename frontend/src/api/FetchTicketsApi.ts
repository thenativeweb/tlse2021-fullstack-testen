import { TicketCount } from '../types/TicketCount';
import { TicketsApi } from './TicketsApi';

const userName = 'testuser';
const createFetchTicketsApi = (host: string): TicketsApi => ({
  async buyTickets (tickets: TicketCount): Promise<void> {
    const response = await fetch(`${host}/command/buyTickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        requestedTicketCountsPerArea: tickets
      })
    });

    if (!response.ok) {
      throw new Error(`Error on API Call. Received status ${response.status}.`);
    }
  },
  async getAvailableTickets (): Promise<TicketCount> {
    const response = await fetch(`${host}/query/getAvailableTickets`);

    return await response.json();
  },
  async getMyTickets (): Promise<TicketCount> {
    const response = await fetch(`${host}/query/getMyTickets/${userName}`);

    return await response.json();
  }
});

export {
  createFetchTicketsApi
};
