import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fireAuth } from "../providers/firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: fireAuth.user,
      photoURL: "",
      displayName: ""
    };
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

  render() {
    return (
      <div className="home">
        {this.state.user ? (
          <>
            <Link className="btn btn-primary my-3" to="/enter">Enter Secret Santa Drawing</Link>
            
            <button
              className="btn btn-danger"
              onClick={() => {
                fireAuth.signOut();
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    );
  }
}
