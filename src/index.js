import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

import reduxStore from './store';

ReactDOM.render(
  (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
);

registerServiceWorker();
