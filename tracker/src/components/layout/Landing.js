import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/pt.svg"

class Landing extends Component {
  render() {
    return (
      
      <div className="landing-container">
        <div className="landing-header">
        <h7>PurpleTabs</h7>
        <Link className="home-login-btn" to="/login">Log in</Link>
        </div>
        <div>
          <div className="">
            <div className="message-brd">
            <h4>NEVER FORGET ANOTHER PASSWORD</h4>
            <h4>GENERATE ACCOUNTS AND SAVE PASSWORDS</h4>
            
              <Link className="get-started-btn" to="/register">Get Started!</Link>
            </div>
          </div>
        </div>
        <div className="btt">

        </div>
      </div>
      
    );
  }
}

export default Landing;