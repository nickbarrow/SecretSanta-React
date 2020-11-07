import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
// import "../../styles/Main.scss";

// Import components.
import Home from '../components/Home';
import Login from '../components/Login';

// Import utility functions.
import { fireAuth } from '../providers/firebase';

export default class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: fireAuth.user
    }
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
      // Main application container
      <div className="application-container" style={{ height: window.innerHeight }}>
        <Router>
          <div className="main-window">
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
            </Switch>  
          </div>
        </Router>
      </div>
    );
  }
}
