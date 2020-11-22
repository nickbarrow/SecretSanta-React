import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fireAuth, db } from "../providers/firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: fireAuth.user,
      photoURL: "",
      displayName: "",
      group: "",
      groupExists: false
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
  
  handleChange = (e) => {
    this.setState({ group: e.target.value});
  }

  // Form submit
  handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get list of groups
    db.ref('groups').once('value', snapshot => {
      let groups = [];
      snapshot.forEach(group => {
        groups.push(group.val());
      });
      
      // Confirm user-entered group exists, otherwise alert.
      if (groups.includes(this.state.group)) {
        this.setState({ groupExists: true });
        this.props.setGroup(this.state.group);
      } else 
          alert("Invalid group, try again.")
    });
  }

  render() {
    return (
      <div className="home">
        {this.state.user ? (
          <>
            {this.state.groupExists ? (
              <Link className="btn btn-primary my-3" to="/enter">Enter Secret Santa Drawing</Link>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <input className="form-control my-3"
                  placeholder="Enter group"
                  value={this.state.group}
                  onChange={this.handleChange} />
                <button className="btn btn-danger w-100 mb-3" type="submit">Submit</button>
              </form>
            )}
            
            <button className="btn btn-secondary"
              onClick={() => { fireAuth.signOut() }}>
              Sign out
            </button>
          </>
        ) : (
          <Link className="btn btn-danger" to="/login">Login</Link>
        )}
      </div>
    );
  }
}
