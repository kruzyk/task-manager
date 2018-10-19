import React, { Component } from "react";
import firebase from "firebase";

const buttonNames = ["All", "Completed", "Active"];
const filters = {
  All: () => true,
  Completed: task => task.isDone,
  Active: task => !task.isDone
};

class App extends Component {
  state = {
    taskTitleAdd: "",
    taskTitleEdit: "",
    activeButtonName: "All",
    tasks: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("/publicTodos")
      .on("value", snapshot => {
        const tasks =
          // zamieniamy obiekt na tablicę tablic dwuelementowych [id, wartość]
          Object.entries(snapshot.val() || {})
            // zamieniamy tę tablicę na tablicę obiektów złożonych z atrybutu id,
            // będącego pierwszym elementem z tablicy dwuelementowej oraz wszystkich
            // atrybutów drugiego elementu
            .map(([id, value]) => ({ id, ...value }))
            // odwracamy tablicę, bo chcemy mieć najnowsze taski na górze
            .reverse();

        // czyścimy pole formularza
        this.setState({
          tasks
        });
      });
  }

  makeHandleChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    firebase
      .database()
      .ref("/publicTodos")
      .push({
        title: this.state.taskTitleAdd,
        isDone: false,
        inEdit: false
      });

    this.setState({
      taskTitleAdd: ""
    });
  };

  makeHandleDestroyClick = taskId => event => {
    firebase
      .database()
      .ref("publicTodos")
      .child(taskId)
      .remove();
  };

  makeHandleCheckboxChange = task => event => {
    firebase
      .database()
      .ref("publicTodos")
      .child(task.id)
      .update({
        isDone: !task.isDone
      });
  };

  makeHandleEnterEditMode = task => event => {
    firebase
      .database()
      .ref("publicTodos")
      .child(task.id)
      .update({
        inEdit: true
      });

      this.setState({
        taskTitleEdit: task.title
      })
  };

  makeHandleInputKeypress = taskId => event => {
    if (event.key !== "Enter") {
      return;
    }
    this.updateTaskTitle(taskId);
  };

  makeHandleMouseLeave = taskId => event => {
    this.updateTaskTitle(taskId);
  };

  updateTaskTitle = taskId => {
    firebase
      .database()
      .ref("publicTodos")
      .child(taskId)
      .update({
        title: this.state.taskTitleEdit,
        inEdit: false
      });
  };

  render() {
    return (
      <section className="todoapp">
        <div>
          <header className="header">
            <h1>todos</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={this.state.taskTitleAdd}
                onChange={this.makeHandleChange("taskTitleAdd")}
              />
            </form>
          </header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label for="toggle-all" />
            <ul className="todo-list">
              {this.state.tasks
                .filter(filters[this.state.activeButtonName])
                .map(task => (
                  <li
                    key={task.id}
                    className={
                      task.inEdit ? "editing" : task.isDone ? "completed" : ""
                    }
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={task.isDone}
                        onChange={this.makeHandleCheckboxChange(task)}
                      />
                      <label
                        onDoubleClick={this.makeHandleEnterEditMode(task)}
                      >
                        {task.title}
                      </label>
                      <button
                        className="destroy"
                        onClick={this.makeHandleDestroyClick(task.id)}
                      />
                    </div>
                    <input
                      className="edit"
                      value={this.state.taskTitleEdit}
                      onKeyPress={this.makeHandleInputKeypress(task.id)}
                      onChange={this.makeHandleChange("taskTitleEdit")}
                      onMouseLeave={this.makeHandleMouseLeave(task.id)}
                    />
                  </li>
                ))}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>{this.state.tasks.filter(filters.Active).length}</strong>
              <span> </span>
              <span>items</span>
              <span> left</span>
            </span>
            <ul className="filters">
              {buttonNames.map(buttonName => (
                <li>
                  <a
                    href="#/"
                    className={
                      this.state.activeButtonName === buttonName
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      this.setState({ activeButtonName: buttonName })
                    }
                  >
                    {buttonName}
                  </a>
                </li>
              ))}
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        </div>
      </section>
    );
  }
}

export default App;