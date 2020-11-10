import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/* import classnames from "classnames"; */
/* import Logo from "../../images/pt.svg" */
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log('submitted');
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div className="login-container">
        <Link to="/" className="sign-in-logo">
         {/*  <img src={Logo}/> */}
        </Link>

        <div className="sign-in-msg">
          <h4>Sign in to PurpleTabs</h4>
        </div>

        <form noValidate onSubmit={this.onSubmit} className="login-form">
          <label className="label" htmlFor="email">Email</label>
          <input className="inputs"
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
          />
                
          <span className="red-text">
            {errors.email}
            {errors.emailnotfound}
          </span>
              
          <label className="label" htmlFor="password">Password</label>
          <input className="inputs"
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
          />
                
          <span className="red-text">
            {errors.password}
            {errors.passwordincorrect}
          </span>
              
          <div className="sign-in-btn-container" >
            <button className="sign-in-btn" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <div className="new-user">
          New to PurpleTabs? <Link to="/register">Register now</Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
   { loginUser }
)(Login);