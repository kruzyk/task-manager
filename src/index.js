import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDPZaSWrcdyrtAn7MSiWglvo0dRAoAgmaw",
  authDomain: "task-manager-6d83d.firebaseapp.com",
  databaseURL: "https://task-manager-6d83d.firebaseio.com",
  projectId: "task-manager-6d83d",
  storageBucket: "task-manager-6d83d.appspot.com",
  messagingSenderId: "557601706684"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
