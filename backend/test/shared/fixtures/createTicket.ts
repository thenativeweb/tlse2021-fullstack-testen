import { Area } from 'lib/domain/types/Area';
import { Ticket } from 'lib/domain/types/Ticket';
import { v4 } from 'uuid';

const defaultTicket: Ticket = {
  id: v4(),
  area: Area.back,
  isAvailable: true
};

const createTicket = (overwrites: Partial<Ticket> = {}): Ticket => ({
  ...defaultTicket,
  ...overwrites
});

export {
  createTicket
};
