import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from '../Navbar'
import Add from '../Add'
import { Link } from "react-router-dom";
import ShowAccounts from "../ShowAccounts";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log(user)
    return (
      <div  className="dash-container">
        
          <p className="greeting-msg">
            Hey there, <b>{user.name.split(" ")[0]}</b>
          </p>

          <Navbar />

          <ShowAccounts user={user}/>

          <div className="fixed-div">
            <button
              onClick={this.onLogoutClick}
              className="logout-btn"
            >
              Logout
            </button>
            <Link to="/add" className="nav-add-btn">Add</Link>
          </div>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);