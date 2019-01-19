import React, { Component, lazy } from 'react'
import { Grid } from '@material-ui/core';

import UtilService from '../../services/utils/Util-Service';
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
      isUpsert: false
    };
  }

  componentWillMount() {
    this.updateList();
  }

  closeUpsertTodo = () => {
    this.setState({ isUpsert: false });
  }

  openUpsertTodo = (todo) => {
    this.setState({ selectedTodo: todo, isUpsert: true });
  }

  updateList = () => {
    const { keyword, category } = this.state;
    const isSearchMode = keyword || category;
    if (isSearchMode) {
      this.searchTodo(keyword, category);
    } else {
      this.getTodoList();
    }
  }

  getTodoList = () => {
    TodoService.getTodoList().then(res => {
      const categoryList = UtilService.getDistinctArray(res.map(todo => todo.category));
      this.setState({
        todoList: res,
        categoryList: categoryList,
        isUpsert: false
      });
    });
  }

  searchTodo = (keyword, category) => {
    TodoService.searchTodo(keyword, category).then(res => {
      this.setState({
        keyword: keyword,
        category: category,
        todoList: res
      });
    })
  }

  render() {
    const { todoList, categoryList, selectedTodo, isUpsert } = this.state;
    return (
      <div className="content">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TodoTopbar
              categoryList={categoryList}
              searchTodo={this.searchTodo}
              openUpsertTodo={this.openUpsertTodo}
            />
          </Grid>
          <Grid item xs={12}>
            <TodoList
              todoList={todoList}
              openUpsertTodo={this.openUpsertTodo}
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        {isUpsert &&
          <TodoUpsert
            open={isUpsert}
            todo={selectedTodo}
            updateList={this.updateList}
            closeUpsertTodo={this.closeUpsertTodo}
          />
        }
      </div>
    )
  }
}
