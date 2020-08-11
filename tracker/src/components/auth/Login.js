import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Logo from "../../images/pt.svg"
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
    console.log('fdsf');
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

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div className="login-container">
        <div>
          <div className="">
            <Link to="/" className="">
              <img src={Logo}/>
            </Link>
            <div>
              <h4>Sign in to PurpleTabs</h4>
            </div>
            <form noValidate onSubmit={this.onSubmit} className="login-form form-group">
              <div className="">
              <label className="label" htmlFor="email">Email</label><br></br>
                <input className="inputs"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  /* className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })} */
                />
                
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="">
              <label className="label" htmlFor="password">Password</label><br></br>
                <input className="inputs"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  /* className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })} */
                />
                
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="" >
                <button className="sign-in-btn" type="submit">
                  Sign In
                </button>
              </div>
            </form>

            <div className="new-user">
              New to PurpleTabs? <Link to="/register">Register now</Link>
            </div>
          </div>
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
   loginUser 
)(Login);