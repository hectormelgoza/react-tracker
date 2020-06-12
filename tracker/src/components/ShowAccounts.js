import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
import axios from 'axios'

/* const Acc = props => (
    <tr>
      <td>{props.accounts.name}</td>
      <td>{props.accounts.user}</td>
      <td>{props.accounts.password}</td>
      <td>{props.accounts.date.substring(0,10)}</td>
      <td>
        { *//* <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a> */
   
       
  export default class ShowAccounts extends Component {
    
    constructor(props) {
      super(props);
      /* this.deleteAccount = this.deleteAccount.bind(this); */
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
    
    showSensitive(){
      console.log("you flipped")
    }

    render() {
      
      console.log(this.state.accounts)
      /* onst accountCards = {this.state.accounts}; */
      return (
        <div>
          <h3>Accounts</h3>
          {
            this.state.accounts.map((item) => {
            return <div className="account-item" key={item._id}><h4>{item.name}</h4> <br></br> 
                  <button className="btn-view" onClick={this.showSensitive} >view</button></div>
            })
          }
        </div>
      )
    }
  }