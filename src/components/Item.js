import React, { Component } from 'react'

export default class Item extends Component {

render() {
    return (
        <div className="account-item">
            <h3>{this.props.acc.name}</h3>
            <h5>User: <span className="user-input">{this.props.acc.user}</span></h5>
            <h5>Password: <span className="password-input">{this.props.acc.password}</span></h5>
            <div className="btn-container">
            <button className="btn-delete" onClick={this.props.delete}>Delete</button>
            <button className="btn-update" onClick={this.props.update}>Update</button>
            </div>

        </div>

    )
}
}