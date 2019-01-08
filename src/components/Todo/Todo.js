import React, { Component, lazy } from 'react'
import { Route, Switch } from 'react-router-dom';
import db from '../../utils/database';
const TodoList = lazy(() => import('./Todo-List'));
const TodoUpsert = lazy(() => import('./Todo-Upsert'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.db = db
    this.state = {
      todoList: this.db.todo
    };
  }

  deleteTodo = (id) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: todoList });
  }

  upsertTodo = (todo) => {
    if (todo.id) {
      // edit
    } else {
      todo.id = this.state.todoList.length;
      this.state.todoList.unshift(todo);
    }
    this.setState({ todoList: this.state.todoList });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <TodoList list={this.state.todoList} deleteTodo={this.deleteTodo} {...props} />} />
        <Route path="/add" render={props => <TodoUpsert upsertTodo={this.upsertTodo} {...props} />} />
      </Switch>
    )
  }
}