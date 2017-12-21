import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import Login from './components/login';

import './index.less';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Login}>
      <IndexRoute component={Login} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
, document.getElementById('dist'));