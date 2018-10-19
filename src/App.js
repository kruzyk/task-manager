import React, { Component } from "react";
import Tasks from "./Tasks";
import firebase from "firebase";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    firebase
      .auth()
      .signInWithEmailAndPassword("bartosz.cytrowski+foo1@gmail.com", "test1234");
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  render() {
    return (
      <div>
        <Tasks firebaseRef={firebase.database().ref("publicTodos")} />
        {this.state.user !== null && (
          <Tasks
            firebaseRef={firebase
              .database()
              .ref(`privateTodos/${this.state.user.uid}`)}
          />
        )}
      </div>
    );
  }
}

export default App;