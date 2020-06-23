import React, { Component } from 'react'



export default class Item extends Component {
    handleDelete(id){
        this.props.delete(id);
    }

render() {
    return (
        <div>
            {this.props.calls.map(item => (
            <ul className="account-item" key={item._id}> 
                <div className="account-name">{item.name}</div>
                <div>User: {item.user}</div>
                <div className="pass" >Password: {item.password}</div>
                <button className="btn-delete" onClick={this.handleDelete.bind(this, item._id)}>Delete</button>
            </ul>
            ))}
        </div>
    )
}
}