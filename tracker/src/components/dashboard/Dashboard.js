import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Add from '../Add'

import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div  className="dash-container">
        <div className="row">
          <div className="">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
            </h4>

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