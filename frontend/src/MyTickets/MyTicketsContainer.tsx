import { ApiContext } from '../api/TicketsApiContext';
import { MyTickets } from './MyTickets';
import { TicketCount } from '../types/TicketCount';
import { Alert, Spinner } from 'react-bootstrap';
import { FunctionComponent, ReactElement, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyTicketsContainerProps {}

const MyTicketsContainer: FunctionComponent<MyTicketsContainerProps> = (): ReactElement => {
  const ticketsApi = useContext(ApiContext);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ tickets, setTickets ] = useState<TicketCount>();

  useEffect((): void => {
    ticketsApi.getMyTickets().
      then((loadedTickets): void => {
        setTickets(loadedTickets);
        setIsLoading(false);
      }).
      // eslint-disable-next-line no-console
      catch((ex): void => console.error('Error while loading Tickets.', ex));
  }, []);

  if (isLoading) {
    return (
      <Spinner role='status' animation='border'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }

  if (!tickets) {
    return (
      <Alert variant='alert'>
        Fehler beim Abfragen ihrer Daten. Bitte versuchen sie es später erneut.
      </Alert>
    );
  }

  return (<MyTickets tickets={ tickets } />);
};

export {
  MyTicketsContainer
};
