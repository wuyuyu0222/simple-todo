import React, { Component, lazy } from 'react'
import { Route, Switch } from 'react-router-dom';
import db from '../../utils/database';
const TodoList = lazy(() => import('./Todo-List'));
const TodoAdd = lazy(() => import('./Todo-Add'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.db = db
    this.todoList = this.db.todo;
    this.newTodo = {
      title: '',
      category: '',
      progress: 0,
      content: '',
      userId: 'jakeWu'
    }
  }

  deleteTodo = (id) => {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.setState({});
  }

  uploadTodo = (todo) => {
    todo.id = this.todoList.length;
    this.todoList.unshift(todo);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <TodoList list={this.todoList} deleteTodo={this.deleteTodo} {...props} />} />
        <Route path="/add" render={props => <TodoAdd todo={this.newTodo} uploadTodo={this.uploadTodo} {...props} />} />
      </Switch>
    )
  }
}