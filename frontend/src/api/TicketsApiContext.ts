import { createFetchTicketsApi } from './FetchTicketsApi';

import React from 'react';

const fetchContext = createFetchTicketsApi('localhost:3000');

const ApiContext = React.createContext(fetchContext);

export {
  fetchContext,
  ApiContext
};
