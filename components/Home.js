import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { fireAuth } from "../providers/firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: fireAuth.user,
      photoURL: '',
      displayName: ''
    }
  }
  
  // Picks up user login & updates state.
  componentDidMount = () => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else this.setState({ user: null });
    });
  };

  render () {
    return (
      <>
        <div className="flex flex-column px-3 py-4">
          { this.state.user && (
            <img src={this.state.photoURL} style={{ width: "100px" }} alt="User" />
          )}

          <div className="home">
            <h2>Welcome
              { this.state.user && (
                <span>, {this.state.displayName}</span>
              )}
            </h2>

            <Link to="/enter">Enter Secret Santa Drawing</Link>
            <br/>
            <Link to="/login">Login</Link>
            <br/>      
            <Link to="/signup">Sign Up</Link>
          </div>

          <div>
            <button
              className="btn btn-danger"
              onClick={() => { fireAuth.signOut(); }}>
              Sign out
            </button>
          </div>
        </div>
      </>
    );
  }
};