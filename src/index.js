import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//引入全局样式
import './static/css/common.css'
import './static/css/font.css'

import App from './App';

import * as serviceWorker from './serviceWorker'
import { Provider } from 'mobx-react'
import stores from './store/index'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister()
