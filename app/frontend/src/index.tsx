import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./store/store";
import {StoreModel} from "./models/StoreModel";
import {BrowserRouter as Router} from 'react-router-dom';
import './assets/styles/index.scss';

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
          <Router>
              <App />
          </Router>
      </Context.Provider>
  </React.StrictMode>
);
