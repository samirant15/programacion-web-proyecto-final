import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import history from './history';
import Login from './screens/Login';
import Packages from './screens/Packages';
import Checkout from './screens/Checkout';
import Orders from './screens/Orders';
import Users from './screens/Users';
import Stats from './screens/Stats';
import 'antd/dist/antd.css';

class App extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact render={props => (<Login history={props.history} />)} />
        <Route path="/login" exact render={props => (<Login history={props.history} />)} />
        <Route path="/packages" exact render={props => (<Packages history={props.history} />)} />
        <Route path="/checkout" exact render={props => (<Checkout history={props.history} />)} />
        <Route path="/orders" exact render={props => (<Orders history={props.history} />)} />
        <Route path="/users" exact render={props => (<Users history={props.history} />)} />
        <Route path="/stats" exact render={props => (<Stats history={props.history} />)} />
      </Router>
    );
  }
}

export default App;
