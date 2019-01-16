import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';

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
      keyword: '',
      category: '',
      selectedTodo: {},
      isUpsert: false,
      isLoading: false,
    };
    this.apiUrl = '/todo';
  }

  componentWillMount() {
    this.updateList();
  }

  addTodo = () => {
    const newTodo = this.setNewTodo();
    this.openUpsertTodo(newTodo);
  }

  setNewTodo = () => {
    return {
      title: '',
      category: this.state.category,
      progress: 0,
      content: '',
      userId: 'jakeWu'
    }
  }

  editTodo = (id) => {
    const todo = this.state.todoList.find(todo => todo.id === id);
    this.openUpsertTodo(todo);
  }

  openUpsertTodo = (todo) => {
    this.setState({ selectedTodo: todo, isUpsert: true });
  }

  cancelUpsertTodo = () => {
    this.setState({ isUpsert: false });
  }

  updateList = () => {
    const { keyword, category } = this.state;
    this.setState({ isLoading: true });
    const isSearchMode = keyword && category;
    if (isSearchMode) {
      this.searchTodo(keyword, category);
    } else {
      this.getTodoList();
    }
  }

  getTodoList = () => {
    Utils.getData(this.apiUrl).then(res => {
      const todoList = this.getSortTodoList(res);
      const categoryList = Common.getDistinctArray(res.map(todo => todo.category));
      this.setState({
        todoList: todoList,
        categoryList: categoryList,
        isUpsert: false,
        isLoading: false
      });
    });
  }

  searchTodo = (keyword, category) => {
    const query = {
      keyword: keyword,
      category: category === 'all' ? '' : category
    };
    Utils.searchData(this.apiUrl, query).then(res => {
      const todoList = this.getSortTodoList(res);
      this.setState({
        keyword: keyword,
        category: category,
        todoList: todoList
      });
    })
  }

  getSortTodoList = (array) => {
    array.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
    return array;
  }

  upsertTodo = (todo) => {
    return Utils.upsertData(this.apiUrl, todo);
  }

  deleteTodo = (id) => {
    return Utils.deleteData(this.apiUrl, id);
  }

  render() {
    const { todoList, categoryList, selectedTodo, isUpsert, isLoading } = this.state;
    return (
      <div className="content">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TodoTopbar
              list={categoryList}
              disabled={isLoading}
              searchTodo={this.searchTodo}
              addTodo={this.addTodo}
            />
          </Grid>
          <Grid item xs={12}>
            <TodoList
              list={todoList}
              disabled={isUpsert || isLoading}
              editTodo={this.editTodo}
              deleteTodo={this.deleteTodo}
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        {isUpsert &&
          <TodoUpsert
            open={isUpsert}
            todo={selectedTodo}
            cancelTodo={this.cancelUpsertTodo}
            upsertTodo={this.upsertTodo}
            updateList={this.updateList}
          />
        }
      </div>
    )
  }
}
