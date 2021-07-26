import { TicketCount } from '../types/TicketCount';
import { TicketsApi } from './TicketsApi';

const defaultApi: TicketsApi = {
  buyTickets: async (): Promise<void> => Promise.resolve(),
  getAvailableTickets: async (): Promise<TicketCount> => Promise.resolve({
    back: 0,
    center: 0,
    front: 0
  }),
  getMyTickets: async (): Promise<TicketCount> => Promise.resolve({
    back: 0,
    center: 0,
    front: 0
  })
};

const createMockTicketsApi = (overwrites: Partial<TicketsApi> = {}): TicketsApi => ({
  ...defaultApi,
  ...overwrites
});

interface ResolvableResponse<TResponseType> {
  promise: Promise<TResponseType>;
  resolve: () => void;
}
const createSchedulableResponse = <TResponseType>(desiredResponse: TResponseType): ResolvableResponse<TResponseType> => {
  let storedResolve: (desiredResponse: TResponseType) => void;

  //
  // eslint-disable-next-line no-return-assign
  const promise = new Promise<TResponseType>((internalResolve): unknown => storedResolve = internalResolve);

  return {
    promise,
    resolve: (): void => storedResolve(desiredResponse)
  };
};

export {
  createMockTicketsApi,
  createSchedulableResponse
};
