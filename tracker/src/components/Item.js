import React, { Component } from 'react'

export default class Item extends Component {

render() {
    return (
        <div className="account-item">
            <h3>{this.props.acc.name}</h3>
            <h5>User: {this.props.acc.user}</h5>
            <h5>Password: {this.props.acc.password}</h5>
            <button className="btn-delete" onClick={() => {this.props.delete(this.props.acc._id)}}>Delete</button>
        </div>
    )
}
}