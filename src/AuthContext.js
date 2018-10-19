import React, { Component } from "react";
import firebase from "firebase";
 // const { Provider, Consumer } = React.createContext()
const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;
 export const AuthConsumer = Consumer;
 export class AuthProvider extends Component {
  state = {
    user: null
  };
   componentDidMount() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        "test+foo@gmail.com",
        "test123"
      );
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
   render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}