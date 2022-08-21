import React from 'react';
/* eslint-disable import/no-unresolved */
import ReactDOM from 'react-dom/client';

import TummyHealth from 'components/TummyHealth';
import AppProvider from 'context/App';
import reportWebVitals from 'utils/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <TummyHealth />
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
