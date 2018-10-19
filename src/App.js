import React, { Component } from "react";
import Tasks from "./Tasks";
import firebase from "firebase";
import { AuthConsumer } from "./AuthContext";

class App extends Component {
  render() {
    return (
      <div>
        <Tasks firebaseRef={firebase.database().ref("publicTodos")} />
        <AuthConsumer>
          {value => (
            value.user &&
            <Tasks
              firebaseRef={firebase
                .database()
                .ref(`privateTodos/${value.user.uid}`)}
            />
          )}
        </AuthConsumer>
      </div>
    );
  }
}

export default App;