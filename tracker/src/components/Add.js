import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class Add extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      user: '',
      password: '',
      date: new Date(),
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/accounts/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            name: response.data.map(name => name.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

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
      name: this.state.name,
      user: this.state.user,
      password: this.state.password,
      date: this.state.date
    }

    console.log(account);

    axios.post('http://localhost:3000/accounts/add', account)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Simply sumbit form to add account</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
          />
        </div>
        <div className="form-group"> 
          <label>User: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.user}
              onChange={this.onChangeUser}
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
              type="text" 
              className="form-control"
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
          <input type="submit" value="Enter" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
