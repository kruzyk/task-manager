import React, { Component } from "react";
import firebase from "firebase";

const { Provider, Consumer } = React.createContext();

export const TaskConsumer = Consumer;

export class TaskProvider extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("/publicTodos")
      .on("value", snapshot => {
        const tasks = Object.entries(snapshot.val() || {})
          .map(([id, value]) => ({ id, ...value }))
          .reverse();

        this.setState({
          tasks
        });
      });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
