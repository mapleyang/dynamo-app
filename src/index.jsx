import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import Home from './home/index';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';
import PolicyDetail from './components/policyDetail';
import Flow from './components/flow';
import BaseInfo from './components/baseInfo';
import HealthInfo from './components/healthInfo';
import UserHealthInfo from './components/userHealthInfo';

import './index.less';


class App extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    if(!sessionStorage.getItem("user")) {
      // location.hash = "/login"
    }
  }

  render() {
    return (
      <div className="main">
        <div className="main-content">{this.props.children}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="logout" component={Logout} />
      <Route path="policydetail" component={PolicyDetail} />
      <Route path="flow" component={Flow} />
      <Route path="baseinfo" component={BaseInfo} />
      <Route path="healthinfo" component={HealthInfo} />
      <Route path="userhealthinfo" component={UserHealthInfo} />
    </Route>
  </Router>
, document.getElementById('dist'));