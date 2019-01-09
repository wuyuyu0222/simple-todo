import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';
import { cloneDeep } from 'lodash';

import db from '../../utils/database';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
import './todo.scss';

const TodoUpsert = lazy(() => import('./Todo-Upsert'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.db = db;
    this.todoList = cloneDeep(this.db.todo);
    this.state = {
      todoList: this.todoList || [],
      searchString: '',
      upsert: false,
    };
    this.selectedTodo = {};
  }

  searchTodo = (searchString) => {
    const todoList = this.state.todoList.filter(todo => {
      return this.searchCondition(todo, searchString);
    });
    this.setState({ searchString: searchString, todoList: todoList });
  }

  selectTodoByCategory = (category) => {
    let todoList = [];
    if (category === 'all') {
      todoList = this.db.todo.filter(todo => {
        return this.searchCondition(todo, this.state.searchString);
      });
    } else {
      todoList = this.todoList.filter(todo => {
        return todo.category === category &&
          this.searchCondition(todo, this.state.searchString);
      });
    }
    this.setState({ todoList: todoList });
  }

  searchCondition = (todo, searchString) => {
    return (
      todo.title.includes(searchString) ||
      todo.category.includes(searchString) ||
      todo.content.includes(searchString)
    )
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
    const todoList = this.todoList.filter(todo => todo.id !== id);
    this.todoList = todoList;
    this.setState({ todoList: this.todoList });
  }

  cancelTodo = () => {
    this.setState({ upsert: false });
  }

  upsertTodo = (todo) => {
    let targetTodo = this.todoList.find(t => t.id === todo.id);
    if (targetTodo) {
      targetTodo = Object.assign(targetTodo, todo);
    } else {
      todo.id = this.state.todoList.length;
      this.todoList.unshift(todo);
    }
    this.setState({ todoList: this.todoList, upsert: false });
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <TodoTopbar
            list={this.todoList}
            disabled={this.state.upsert}
            searchTodo={this.searchTodo}
            selectTodo={this.selectTodoByCategory}
            addTodo={this.addTodo}
          />
        </Grid>
        {this.state.upsert &&
          <Grid item xs={12}>
            <TodoUpsert
              todo={this.selectedTodo}
              cancelTodo={this.cancelTodo}
              upsertTodo={this.upsertTodo}
            />
          </Grid>
        }
        <Grid item xs={12}>
          <TodoList
            list={this.state.todoList}
            upsert={this.state.upsert}
            editTodo={this.editTodo}
            deleteTodo={this.deleteTodo}
          />
        </Grid>
      </Grid>
    )
  }
}
