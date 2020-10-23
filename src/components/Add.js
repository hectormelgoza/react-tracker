import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
/* import "react-datepicker/dist/react-datepicker.css"; */
import axios from 'axios';
/* import "bootstrap/dist/css/bootstrap.min.css"; */


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";



class Add extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id:[],
      name: [],
      user: [],
      password: [],
      date: new Date()
    }
  }

  componentDidMount() {
    /* axios.get('http://localhost:4000/api/users')
      .then(res => {
      this.setState({id: res.data.id})
      })
      .catch((error) => {
        console.log(error);
      }) */
      this.setState({id: this.props.auth.user.id})
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const account = {
      id: this.state.id,
      name: this.state.name,
      user: this.state.user,
      password: this.state.password,
      date: this.state.date
    }

    console.log(account);

    axios.post("/api/users/add", account)
    .then(() => console.log('something went wrong'))
    .catch(err => console.log('error'));
    
    window.location = '/dashboard';
  }

  render() {
    console.log("State: ", this.state)
    return (
    <div>
      <h3>Submit form to add account!</h3>
      <form onSubmit={this.onSubmit} className="add-form">
        <div> 
          <label>Name: </label>
          <input  
              type="text"
              required
              className="form-control"
              placeholder="Account Name..."
              value={this.state.name}
              onChange={this.onChangeName}
          />
        </div>
        <div className="form-group"> 
          <label>User: </label>
          <input  
              type="text"
              required
              className="form-control"
              placeholder="User/Email..."
              value={this.state.user}
              onChange={this.onChangeUser}
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
              type="text" 
              className="form-control"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
Add.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Add);