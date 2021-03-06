import React, {Component} from 'react'
/* import "bootstrap/dist/css/bootstrap.min.css"; */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Add from './components/Add'
/* import Navbar from "./components/Navbar"
import ShowAccounts from './components/ShowAccounts'
import EditAccount from './components/EditAccount' */


import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import './App.css';
/* import { registerLocale } from 'react-datepicker'; */

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
          {/* <Navbar /> */}
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/add" component={Add} />
          </Switch>
          {/* <Route path="/api/:id"  component={EditAccount} /> */}
          {/* <Route path="/register" component={Register} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
