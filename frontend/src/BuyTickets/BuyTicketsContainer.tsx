import { BuyTickets } from './BuyTickets';
import { FunctionComponent, ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BuyTicketsContainerProps {}

const BuyTicketsContainer: FunctionComponent<BuyTicketsContainerProps> = (): ReactElement => (
  <BuyTickets
    available={{
      back: 2,
      center: 3,
      front: 4
    }}
    onSubmit={
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (): void => {}
    }
  />
);

export {
  BuyTicketsContainer
};
