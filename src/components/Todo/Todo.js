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
      searchString: '',
      category: '',
      selectedTodo: {},
      isUpsert: false,
      isLoading: false,
    };
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
    const { searchString, category } = this.state;
    this.setState({ isLoading: true });
    const isSearchMode = searchString && category;
    if (isSearchMode) {
      this.searchTodo(searchString, category);
    } else {
      Utils.getTodoList().then(res => {
        const categoryList = Common.getDistinctArray(res.map(todo => todo.category));
        this.setState({
          todoList: res,
          categoryList: categoryList,
          isUpsert: false,
          isLoading: false
        });
      });
    }
  }

  render() {
    const { todoList, categoryList, selectedTodo, isUpsert, isLoading } = this.state;
    return (
      <>
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
              deleteTodo={Utils.deleteTodo}
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        {isUpsert &&
          <TodoUpsert
            open={isUpsert}
            todo={selectedTodo}
            cancelTodo={this.cancelUpsertTodo}
            upsertTodo={Utils.upsertTodo}
            updateList={this.updateList}
          />
        }
      </>
    )
  }
}
