import { ApiContext } from '../api/TicketsApiContext';
import { BuyTickets } from './BuyTickets';
import { TicketCount } from '../types/TicketCount';
import { Alert, Spinner } from 'react-bootstrap';
import React, { FunctionComponent, ReactElement, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BuyTicketsContainerProps {}

const BuyTicketsContainer: FunctionComponent<BuyTicketsContainerProps> = (): ReactElement => {
  const ticketsApi = useContext(ApiContext);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ showBuySuccess, setShowBuySuccess ] = useState<boolean>(false);
  const [ availableTickets, setAvailableTickets ] = useState<TicketCount>({
    back: 0,
    center: 0,
    front: 0
  });

  const loadAndSetAvailableTickets = (): void => {
    ticketsApi.getAvailableTickets().
      then(async (loadedAvailableTickets): Promise<void> => {
        setAvailableTickets(loadedAvailableTickets);
        setIsLoading(false);
      }).
      catch((ex): void => {
        // eslint-disable-next-line no-console
        console.error('Error while loading available Tickets:', ex);
      });
  };

  useEffect((): void => {
    loadAndSetAvailableTickets();
  }, []);

  const handleTicketBuyRequest = (desiredTickets: TicketCount): void => {
    ticketsApi.
      buyTickets(desiredTickets).
      then((): void => {
        setShowBuySuccess(true);
        loadAndSetAvailableTickets();
      }).
      catch((ex): void => {
        // eslint-disable-next-line no-console
        console.error('Error while calling buyTickets-API:', ex);
      });
  };

  if (isLoading) {
    return (
      <Spinner role='status' animation='border'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }

  return (
    <React.Fragment>
      <BuyTickets
        available={ availableTickets }
        onSubmit={ handleTicketBuyRequest }
      />
      { showBuySuccess && (<Alert variant='success'>Ticketkauf erfolgreich!</Alert>)}
    </React.Fragment>
  );
};

export {
  BuyTicketsContainer
};
