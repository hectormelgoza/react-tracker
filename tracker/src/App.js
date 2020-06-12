import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, BrowserRouter as Router} from 'react-router-dom'

import Add from './components/Add'
import Navbar from "./components/Navbar"
import ShowAccounts from './components/ShowAccounts'
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <Route path="/" component={ShowAccounts} />
      <Route path="/new" component={Add} />
      </div>
    </Router>
  );
}

export default App;
