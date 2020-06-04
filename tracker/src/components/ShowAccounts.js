import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
import axios from 'axios'

const Acc = props => (
    <tr>
      <td>{props.account.name}</td>
      <td>{props.account.user}</td>
      <td>{props.account.password}</td>
      <td>{props.account.date.substring(0,10)}</td>
      <td>
        {/* <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a> */}
      </td>
    </tr>
  )
  
  export default class ShowAccount extends Component {
    constructor(props) {
      super(props);
  
      this.deleteAccount = this.deleteAccount.bind(this);
  
      this.state = {accounts: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/accounts/')
        .then(response => {
          this.setState({ accounts: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteAccount(id) {
      axios.delete('http://localhost:5000/accounts/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        accounts: this.state.accounts.filter(el => el._id !== id)
      })
    }
  
    accountList() {
      return this.state.accounts.map(currentaccount => {
        return <Acc exercise={currentaccount} deleteAccount={this.deleteAccount} key={currentaccount._id}/>;
      })
    }
  
    render() {
      return (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.accountList() }
            </tbody>
          </table>
        </div>
      )
    }
  }