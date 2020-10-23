import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <Link to="/" /* className="brand-img" */> </Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Accounts</Link>
          </li>
          <li className="navbar-item">
          <Link to="/add" className="nav-link">Add</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}