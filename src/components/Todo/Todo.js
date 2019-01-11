import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';
import { cloneDeep } from 'lodash';

import { Utils, Common } from '../../utils/common';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
import './todo.scss';

const TodoUpsert = lazy(() => import('./Todo-Upsert'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      categoryList: [],
      searchString: '',
      category: '',
      upsert: false,
      loading: false,
    };
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
      category: this.state.category,
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
    if (!this.state.searchString && !this.state.category) {
      Utils.getTodoList().then(res => {
        this.setState({ todoList: res, upsert: false, loading: false });
      });
    } else {
      this.searchTodo(this.state.searchString, this.state.category);
    }
    this.updateCategoryList();
  }

  updateCategoryList = () => {
    Utils.getTodoList().then(res => {
      const categoryList = Common.getDistinctArray(res);
      this.setState({ categoryList: categoryList, upsert: false, loading: false });
    })
  }

  render() {
    const { todoList, categoryList, upsert, loading } = this.state;
    return (
      <>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TodoTopbar
              list={categoryList}
              disabled={loading}
              searchTodo={this.searchTodo}
              addTodo={this.addTodo}
            />
          </Grid>
          <Grid item xs={12}>
            <TodoList
              list={todoList}
              disabled={upsert || loading}
              editTodo={this.editTodo}
              deleteTodo={Utils.deleteTodo}
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        {upsert &&
          <TodoUpsert
            open={upsert}
            todo={this.selectedTodo}
            cancelTodo={this.cancelTodo}
            upsertTodo={Utils.upsertTodo}
            updateList={this.updateList}
          />
        }
      </>
    )
  }
}
