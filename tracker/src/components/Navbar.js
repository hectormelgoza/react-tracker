import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" /* className="brand-img" */> <img alt="Logo" src="../images/cheese.svg" width="200px" height="200px"/> </Link>
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