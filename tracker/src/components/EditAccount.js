import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: [],
      user: [],
      password: [],
      date: new Date()
    }
  }
  componentDidMount() {
    axios.get('http://localhost:4000/api/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          user: res.data.user,
          password: res.data.password,
          date: new Date(res.data.date)
        })
      })
      console.log(this.state.name)
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

    axios.post('http://localhost:4000/api/'+ this.props.match.params.id, account)
    .then(res => res.json('account updated!'))
    
    window.location = '/';
  }

  render() {
    console.log(this.state.name)
    return (
    <div>
      <h3>Edit Account!</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
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
