import { createFetchTicketsApi } from './FetchTicketsApi';

import React from 'react';

// eslint-disable-next-line no-process-env
const backendUrl = `http://${process.env.BACKEND_HOSTNAME ?? 'localhost'}:${process.env.BACKEND_PORT ?? '3000'}`;

const fetchContext = createFetchTicketsApi(backendUrl);

const ApiContext = React.createContext(fetchContext);

export {
  fetchContext,
  ApiContext
};
