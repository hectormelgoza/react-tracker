import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, BrowserRouter as Router} from 'react-router-dom'

import Add from './components/Add'
import Navbar from "./components/Navbar"
import ShowAccounts from './components/ShowAccounts'
import EditAccount from './components/EditAccount'

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <Route path="/" exact component={ShowAccounts} />
      <Route path="/add" component={Add} />
      <Route path="/api/:id"  component={EditAccount} />
      <Route path="/login" component={Add} />
      </div>
    </Router>
  );
}

export default App;
