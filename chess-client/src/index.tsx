import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store';
import { IconContext } from 'react-icons';
import { ChakraBaseProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{ size: '17px', style: { display: 'inline' } }}>
        <ChakraBaseProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraBaseProvider>
      </IconContext.Provider>
    </Provider>
  </React.StrictMode>,
);
