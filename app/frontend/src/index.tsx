import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import Store from "./store/store";
import {StoreModel} from "./models/StoreModel";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';

export const store = new Store();

export const Context = createContext<StoreModel>({
    store,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Context.Provider value={{
          store
      }
      }>
          <App />
      </Context.Provider>
  </React.StrictMode>
);
