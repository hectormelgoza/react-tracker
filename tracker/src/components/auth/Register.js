import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      date: new Date()
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      date: this.state.date
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register-container">
        <div className="">
          <div className="">
            <h4>Join today for free</h4>
            <form noValidate onSubmit={this.onSubmit} className="login-form form-group">
              <div className="">
              <label className="label" htmlFor="name">Name<span className="red-text">{errors.name}</span></label><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  /* className={classnames("", {
                    invalid: errors.name
                  })} */
                  className="inputs"
                />
              </div>
              <div className="">
              <label className="label"htmlFor="email">Email<span className="red-text">{errors.email}</span></label><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  /* className={classnames("", {
                    invalid: errors.email
                  })} */
                  className="inputs"
                />
              </div>
              <div className="input-field col s12">
              <label className="label" htmlFor="password">Password<span className="red-text">{errors.password}</span></label><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  /* className={classnames("", {
                    invalid: errors.password
                  })} */
                  className="inputs"
                />
              </div>
              <div className="input-field col s12">
              <label className="label" htmlFor="password2">Confirm Password<span className="red-text">{errors.password2}</span></label><br></br>
                <input
                  className="inputs"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  /* className={classnames("", {
                    invalid: errors.password2
                  })} */
                />
              </div>
              <div className="" >
                <button
                  type="submit"
                  className="sign-up-btn"
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="new-user">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
