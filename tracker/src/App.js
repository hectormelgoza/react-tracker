import React from 'react'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Welcome  from './components/Welcome';
import './App.css';

function App() {
  return (
      <div className="main-container">
        <Welcome />
        <Router>
        <Link className="add-btn" to="/add">Add Account</Link>
        </Router>
      
      </div>
  );
}

export default App;
