import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';

import { Common } from '../../services/utils/common';
import TodoService from '../../services/todo/Todo-Service';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
import './style/todo.scss';

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
    this.service = new TodoService();
  }

  componentWillMount() {
    this.updateList();
  }

  addTodo = () => {
    const newTodo = this.service.getEmptyTodo();
    newTodo.category = this.state.category;
    this.openUpsertTodo(newTodo);
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
    this.service.getTodoList().then(res => {
      const categoryList = Common.getDistinctArray(res.map(todo => todo.category));
      this.setState({
        todoList: res,
        categoryList: categoryList,
        isUpsert: false,
        isLoading: false
      });
    });
  }

  searchTodo = (keyword, category) => {
    this.service.searchTodo(keyword, category).then(res => {
      this.setState({
        keyword: keyword,
        category: category,
        todoList: res
      });
    })
  }

  upsertTodo = (todo) => {
    return this.service.upsertTodo(todo);
  }

  deleteTodo = (id) => {
    return this.service.deleteTodo(id);
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
