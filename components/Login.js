import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fireAuth, signInWithGoogle } from "../providers/firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: fireAuth.user
    };
  }
  
  // Update user when auth state changes.
  componentDidMount = async () => {
    fireAuth.onAuthStateChanged((user) => {
        if (user) {
            this.setState({ user });
        } else this.setState({ user: null });
    });

    if (this.state.redirect)
      this.setState({ redirect: false });
  };

  render () {
    return (
      <div className="border rounded p-4">
        { this.state.user && (
          <p>{ this.state.user.displayName }</p>
        )}
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Sign in with Google
        </button>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="signup" className="text-blue">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="reset-password" className="text-blue">
            Forgot Password?
          </Link>
        </p>
      </div>
    );
  }
}