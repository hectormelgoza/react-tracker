import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Item from './Item'
import EditAccount from './EditAccount';
       
export default class ShowAccounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {account: []};
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/api')
      .then(res => {
      this.setState({account: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAccount(id) {
    axios.delete('http://localhost:4000/api/'+id)
    .then(() => console.log('account deleted from database'))
    
    const account = this.state.account.filter(el => el._id !== id)
    this.setState({ account })
  }

  handleUpdate(id) {
    window.location = 'api/' + id;
  }

  render() {
    console.log(this.state.account)
    return (
      <div>
        <h1>Live Accounts: {this.state.account.length}</h1>
      {this.state.account.map(item => (
      <Item 
        key={item._id} 
        acc={item}
        update={() => this.handleUpdate(item._id)}
        delete={() => this.deleteAccount(item._id)} /> ))}
      </div>
    )
  }
}