import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/pt.svg"

class Landing extends Component {
  render() {
    return (
      
      <div className="landing-container">
        <h7>PurpleTabs</h7>
    
        <div>
          <div className="">
            <div className="message-brd">
            <h4>NEVER FORGET ANOTHER PASSWORD</h4>
            <h8>GENERATE ACCOUNTS AND SAVE PASSWORDS</h8>
            
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