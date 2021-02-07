import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './font.css';
import Root from './pages/Root/Root';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
