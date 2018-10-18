import React, { Component } from "react";

class App extends Component {
  state = {
    taskTitle: "",
    titleEdited: "",
    tasks: [
      {
        id: 1,
        title: "Read pdfs",
        isDone: false,
        isEditing: false
      },
      {
        id: 2,
        title: "Learn React",
        isDone: true,
        isEditing: false
      },
      {
        id: 3,
        title: "Go to sleep",
        isDone: false,
        isEditing: false
      }
    ]
  };
  addTask = title => {
    this.setState({
      tasks: [
        {
          id: Date.now(),
          title: title,
          isDone: false,
          isEditing: false
        }
      ].concat(this.state.tasks),
      taskTitle: ""
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.taskTitle === "") {
      return;
    }
    this.addTask(this.state.taskTitle);
  };

  handleChange = event => {
    this.setState({
      taskTitle: event.target.value
    });
  };

  handleTaskDone = taskId => {
    this.setState({
      tasks: this.state.tasks.map(
        task =>
          taskId !== task.id
            ? task
            : {
              ...task,
              isDone: !task.isDone
            }
      )
    });
  };

  removeTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => taskId !== task.id)
    });
  };

  handleTaskEditStatus = taskId => {
    const taskToEdit = this.state.tasks.find(task => task.id === taskId);
    this.setState({
      titleEdited: taskToEdit.title,
      tasks: this.state.tasks.map(
        task =>
          taskId !== task.id
            ? task
            : {
              ...task,
              isEditing: !task.isEditing
            }
      )
    });
  };

  editTask = taskId => {
    this.setState({
      tasks: this.state.tasks.map(
        task =>
          taskId !== task.id
            ? task
            : {
              ...task,
              title: this.state.titleEdited,
              isEditing: !task.isEditing
            }
      )
    });
  };

  handleEdit = event => {
    event.preventDefault();
    this.setState({ titleEdited: event.target.value });
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
                value={this.state.taskTitle}
                onChange={this.handleChange}
              />
            </form>
          </header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label for="toggle-all" />
            <ul className="todo-list">
              {this.state.tasks.map(task => (
                <li
                  className={
                    task.isDone ? "completed" : task.isEditing ? "editing" : ""
                  }
                  key={task.id}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      onClick={() => this.handleTaskDone(task.id)}
                    />
                    <label
                      onDoubleClick={() => this.handleTaskEditStatus(task.id)}
                    >
                      {task.title}
                    </label>
                    <button
                      className="destroy"
                      onClick={() => this.removeTask(task.id)}
                    />
                  </div>
                  <input
                    className="edit"
                    value={this.state.titleEdited}
                    onChange={this.handleEdit}
                    onMouseLeave={() => this.editTask(task.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>
                {this.state.tasks.filter(task => task.isDone !== true).length}
              </strong>
              <span> </span>
              <span>items</span>
              <span> left</span>
            </span>
            <ul className="filters">
              <li>
                <a href="#/" className="selected">
                  All
                </a>
              </li>
              <span> </span>
              <li>
                <a href="#/active" className="">
                {/* {this.state.tasks.filter(task => task.isDone !== true)} */}
                  Active
                </a>
              </li>
              <span> </span>
              <li>
                <a href="#/completed" className="">
                {/* {this.state.tasks.filter(task => task.isDone == true)} */}
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        </div>
      </section>
    );
  }
}

export default App;