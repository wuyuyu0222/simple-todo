import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import db from '../../utils/database';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
const TodoUpsert = lazy(() => import('./Todo-Upsert'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.db = db
    this.state = {
      todoList: this.db.todo || [],
      upsert: false,
    };
    this.selectedTodo = {};
  }

  searchTodo = (searchString) => {
    const todoList = this.db.todo.filter(todo => {
      return (
        todo.title.includes(searchString) ||
        todo.category.includes(searchString) ||
        todo.content.includes(searchString)
      )
    });
    this.setState({ todoList: todoList });
  }

  addTodo = () => {
    const newTodo = {
      title: '',
      category: '',
      progress: 0,
      content: '',
      userId: 'jakeWu'
    }
    this.selectedTodo = cloneDeep(newTodo);
    this.setState({ upsert: true });
  }

  editTodo = (id) => {
    this.selectedTodo = this.state.todoList.find(todo => todo.id === id);
    this.setState({ upsert: true });
  }

  deleteTodo = (id) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: todoList });
  }

  cancelTodo = () => {
    this.setState({ upsert: false });
  }

  upsertTodo = (todo) => {
    let targetTodo = this.state.todoList.find(t => t.id === todo.id);
    if (targetTodo) {
      targetTodo = Object.assign(targetTodo, todo);
    } else {
      todo.id = this.state.todoList.length;
      this.state.todoList.unshift(todo);
    }
    this.setState({ todoList: this.state.todoList, upsert: false });
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TodoTopbar searchTodo={this.searchTodo} addTodo={this.addTodo}></TodoTopbar>
        </Grid>
        {this.state.upsert &&
          <Grid item xs={12}>
            <TodoUpsert todo={this.selectedTodo} cancelTodo={this.cancelTodo} upsertTodo={this.upsertTodo} />
          </Grid>
        }
        <Grid item xs={12}>
          <TodoList list={this.state.todoList} upsert={this.state.upsert} editTodo={this.editTodo} deleteTodo={this.deleteTodo}></TodoList>
        </Grid>
      </Grid>
    )
  }
}