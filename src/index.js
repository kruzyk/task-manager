import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./setupFirebase";
import firebase from 'firebase'
import { TaskProvider } from "./TaskContext";

ReactDOM.render(
  <TaskProvider>
    <App firebaseRef={firebase.database().ref('publicTodos')}/>
  </TaskProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
