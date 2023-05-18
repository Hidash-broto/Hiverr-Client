import  { StyledEngineProvider } from '@mui/styled-engine';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './redux/Store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>  
    <Provider store={store}>
    <App />
    </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);

