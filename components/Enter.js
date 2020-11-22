import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fireAuth } from "../providers/firebase";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: fireAuth.user,
      displayName: "",
      firstName: "",
      lastName: "",
      wish: ""
    };
  }

  // Picks up user login & updates state.
  componentDidMount = () => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          displayName: user.displayName
        });
      } else this.setState({ user: null });
    });
  };

  handleChange = (e) => {
    switch(e.target.name) {
      case 'firstName':
        this.setState({ firstName: e.target.value });
        break;
      case 'lastName':
        this.setState({ lastName: e.target.value });
        break;
      case 'wish':
          this.setState({ wish: e.target.value });
          break;
      default:
        return;
    }
    // console.log(e.target.name, e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.firstName);
    console.log(this.state.lastName);
    console.log(this.state.wish);
  }

  render() {
    return (
      <div className="enter">
        <form onSubmit={this.handleSubmit}>
          <input className="form-control my-3"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange} />
            
          <input className="form-control mb-3"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange} />

          <textarea className="form-control mb-3"
            type="text"
            name="wish"
            placeholder="Dear Santa, I would like..."
            value={this.state.wish}
            onChange={this.handleChange} />

          <input className="btn btn-danger" type="submit" value="Send Letter" />
        </form>
        
      </div>
    );
  }
}
