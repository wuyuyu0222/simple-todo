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
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <TodoList list={this.todoList} {...props} />} />
        <Route path="/add" render={props => <TodoAdd {...props} />} />
      </Switch>
    )
  }
}