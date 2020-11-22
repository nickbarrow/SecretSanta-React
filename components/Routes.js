import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Import utility functions.
import { fireAuth } from "../providers/firebase";
// Import components.
import Home from "../components/Home";
import Login from "../components/Login";
import Enter from "../components/Enter";

export default class Routes extends Component {
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

    if (this.state.redirect) this.setState({ redirect: false });
  };

  render() {
    return (
      // Root height adjustment
      <div className="root-actual-height" style={{ 'height': window.innerHeight }}>
        <img className="scroll top" src="images/scroll_top.png" alt="Top of scroll" />
        <img className="scroll middle" src="images/scroll_middle.png" alt="Top of scroll" />
        {/* Main application container */}
        <div className="application-container">
          <Router>
          <div className="header">
            <Link to="/">
              <img className="header-img" src="images/header.png" alt="Title" />
            </Link>
            <h1>{"Group"} - 2020</h1>
          </div>

            <Switch>
              <Route path="/" component={Home} exact />

              <Route
                path="/login"
                render={() => {
                  // Already logged in
                  if (this.state.user) return <Redirect to="/" />;
                  else return <Login />;
                }}
                exact
              />

              {/* Enter drawing page */}
              <Route
                path="/enter"
                render={() => {
                  // Already logged in
                  if (!this.state.user) return <Redirect to="/" />;
                  else return <Enter />;
                }}
                exact
              />
            </Switch>
          </Router>
        </div>

        <img className="scroll bottom" src="images/scroll_bottom.png" alt="Bottom of scroll" />
      </div>
    );
  }
}
