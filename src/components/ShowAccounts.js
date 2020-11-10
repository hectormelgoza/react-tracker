import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
import axios from 'axios'
import Item from './Item'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
       
class ShowAccounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {id:'', account: [], search: []};
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  
  componentDidMount() {
    this.setState({id: this.props.auth.user.id})
    axios.get('/api/users/' + this.props.auth.user.id)
      .then(res => this.setState({
        account: res.data.accounts
      }))
      .catch((error) => {
        console.log(error);
      }) 
  }

  deleteAccount(id) {
    axios.delete('api/users/delete/'+id)
    .then(() => console.log('account deleted from database'))
    .catch((err)=> console.log(err))
    const account = this.state.account.filter(el => el._id !== id)
    this.setState({ account })
  }

  handleUpdate(id) {
    window.location = '/api/' + id;
  }

  updateSearch(e){
    this.setState({
        search: e.target.value
    })
  }

  render() {

    let filteredAccounts = this.state.account.filter(
      (account) => {
        return account.name.toLowerCase().indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div>
    
        <h1>Live Accounts: {this.state.account.length}</h1>
        
      
            <input  
              type="text"
              className="search-filter"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.updateSearch}
          />
        

        {<div className="checklist"> 
          {filteredAccounts.map(item => (
          <Item 
            key={item._id} 
            acc={item}
            update={() => this.handleUpdate(item._id)}
            delete={() => this.deleteAccount(item._id)} /> ))}
        </div>}
      </div>
    )
  }
}

ShowAccounts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ShowAccounts);