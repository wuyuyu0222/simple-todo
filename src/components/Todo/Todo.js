import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';
import { cloneDeep } from 'lodash';

import { Utils } from '../../utils/common';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
import './todo.scss';

const TodoUpsert = lazy(() => import('./Todo-Upsert'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      searchString: '',
      category: '',
      upsert: false,
      loading: false,
    };
    this.categoryList = [];
    this.selectedTodo = {};
  }

  componentWillMount() {
    this.updateList();
  }

  searchTodo = (searchString, category) => {
    Utils.searchTodo(searchString, category).then(res => {
      this.setState({ searchString: searchString, category: category, todoList: res });
    })
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

  cancelTodo = () => {
    this.setState({ upsert: false });
  }

  updateList = () => {
    Utils.getTodoList().then(res => {
      this.categoryList = [...(new Set(res.map(todo => todo.category)))];
      this.setState({ todoList: res, upsert: false, loading: false });
    })
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <TodoTopbar
            list={this.categoryList}
            disabled={this.state.loading}
            searchTodo={this.searchTodo}
            addTodo={this.addTodo}
          />
        </Grid>
        {this.state.upsert &&
          <Grid item xs={12}>
            <TodoUpsert
              todo={this.selectedTodo}
              cancelTodo={this.cancelTodo}
              upsertTodo={Utils.upsertTodo}
              updateList={this.updateList}
            />
          </Grid>
        }
        <Grid item xs={12}>
          <TodoList
            list={this.state.todoList}
            disabled={this.state.upsert || this.state.loading}
            editTodo={this.editTodo}
            deleteTodo={Utils.deleteTodo}
            updateList={this.updateList}
          />
        </Grid>
      </Grid>
    )
  }
}
