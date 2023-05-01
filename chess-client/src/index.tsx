import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store';
import { IconContext } from 'react-icons';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{ size: '17px', style: { display: 'inline' } }}>
        <App />
      </IconContext.Provider>
    </Provider>
  </React.StrictMode>,
);
