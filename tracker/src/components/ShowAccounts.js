import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
import axios from 'axios'

const Account = props => {
  <div>
    <h7>{props.account.name}</h7>
   { <button className="btn-delete" onClick={() => {props.delete(props.account._id)} }>Delete</button>}
  </div>
}
   
       
  export default class ShowAccounts extends Component {
    
    constructor(props) {
      super(props);
      this.deleteAccount = this.deleteAccount.bind(this);
      this.accountList = this.accountList.bind(this);
      this.state = {accounts: []};
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
  
   /*  deleteAccount(id) {
      axios.delete('http://localhost:5000/accounts/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        accounts: this.state.accounts.filter(el => el._id !== id)
      })
    } */
  
  /*   accountList(){
      const account = this.state.accounts
     
      
      console.log(account)
    }; */
    
    deleteAccount(id){
      console.log("clicked delete");
      
      axios.delete('http://localhost:4000/api/'+id)
        .then(res => console.log(res.data));
        this.setState({
          accounts: this.state.accounts.filter(card => card._id != id)
        })
  }

  accountList(){
      return this.state.accounts.map(item => {
        return <Account account={item} delete={this.deleteAccount} key={item._id}/>
      })
  }

    render() {
      
      console.log(this.state.accounts)
      /* onst accountCards = {this.state.accounts}; */
      return (
        <div>
          <h3>Accounts</h3>
          <div>{this.accountList}</div>
        </div>
      )
    }
  }