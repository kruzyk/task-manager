import React, { Component } from 'react'
import Tasks from './Tasks'
import firebase from 'firebase'

class App extends Component {
  render() {
    return (
      <div>
        <Tasks firebaseRef={firebase.database().ref("publicTodos")} />
      </div>
    )
  }
}

export default App