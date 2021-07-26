import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApiContext, fetchContext } from './api/TicketsApiContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={ fetchContext }>
      <App />
    </ApiContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
