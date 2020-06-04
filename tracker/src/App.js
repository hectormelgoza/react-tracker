import React from 'react'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Welcome  from './components/Welcome'
import Add from './components/Add'
import ShowAccounts from './components/ShowAccounts'
import './App.css';

function App() {
  return (
      <div className="main-container">
        <Welcome />
        <Router>
        <Link className="add-btn" to="/account">Add Account</Link>
        <Route path="/" component={ShowAccounts} />
        <Route path="/accounts" component={Add} />
        </Router>
      </div>
  );
}

export default App;
