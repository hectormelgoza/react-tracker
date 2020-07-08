import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
import axios from 'axios'
import Item from './Item'
       
export default class ShowAccounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {account: []};
    this.deleteAccount = this.deleteAccount.bind(this);
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
    axios.get('http://localhost:4000/api')
      .then(res => {
      this.setState({account: res.data})
      })
  }

  render() {
    console.log(this.state.account)
    return (
      <div>
        {
        this.state.account.map(item => (
          <Item key={item._id} acc={item} delete={() => this.deleteAccount(item._id)} /> ))
        }
      </div>
    )
  }
}