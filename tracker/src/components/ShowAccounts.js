import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
import axios from 'axios'
import Item from './Item'
       
  export default class ShowAccounts extends Component {
    
    constructor(props) {
      super(props);
      this.state = {accounts: []};
      this.deleteAccount = this.deleteAccount.bind(this);
    }
    
    componentDidMount() {
      axios.get('http://localhost:4000/api')
        .then(res => {
        this.setState({accounts: res.data})
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteAccount(id) {
      axios.delete('http://localhost:4000/api/'+id)
        .then(() => this.setState({
          accounts: [this.state.accounts.filter(el => el !== id)]
        }) );
    }

    render() {
      console.log(this.state.accounts)
      return (
        <>
          <h3>Accounts</h3>
          <div>{
          this.state.accounts.map(item => {
          return <Item key={item._id} acc={item} delete={this.deleteAccount} /> })
          }</div>
        </>
      )
    }
  }