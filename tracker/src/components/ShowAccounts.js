import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Item from './Item'

       
export default class ShowAccounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {account: [], search: []};
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
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

  updateSearch(e){
    this.setState({
        search: e.target.value
    })
  }

  render() {
    console.log(this.state.account)
    console.log(this.state.search)

    let filteredAccounts = this.state.account.filter(
      (account) => {
        return account.name.toLowerCase().indexOf(this.state.search) !== -1;
      }
    );
    return (
      <div>
        <h1>Live Accounts: {this.state.account.length}</h1>
        <div className="search-filter">
            <input  
              type="text"
              className="form-control"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.updateSearch}
          />
        </div>
        <div>{
          filteredAccounts.map(item => (
          <Item 
            key={item._id} 
            acc={item}
            update={() => this.handleUpdate(item._id)}
           delete={() => this.deleteAccount(item._id)} /> ))}
        </div>
        
      </div>
    )
  }
}