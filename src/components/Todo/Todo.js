import React, { Component, lazy } from 'react'
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import TodoService from '../../services/todo/Todo-Service';
import { mapStateToProps } from '../../App-Store';
import * as actions from '../../services/todo/Todo-Actions';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
import './style/todo.scss';

const TodoUpsert = lazy(() => import('./Todo-Upsert'));

class Todo extends Component {

  componentWillMount() {
    this.updateList();
  }

  editTodo = (id) => {
    const { todoList, openUpsertTodo } = this.props;
    const todo = todoList.find(todo => todo.id === id);
    openUpsertTodo(todo);
  }

  updateList = () => {
    const { loading, keyword, category } = this.props;
    loading();
    const isSearchMode = keyword || category !== 'all';
    this.getTodoList(keyword, category);
    if (!isSearchMode) {
      this.getCategoryList();
    }
  }

  getTodoList = (keyword, category) => {
    const { updateTodoList } = this.props;
    TodoService.getTodoList(keyword, category).subscribe(res => {
      updateTodoList(res);
    });
  }

  getCategoryList = () => {
    const { updateCategoryList } = this.props;
    TodoService.getCategoryList().subscribe(res => {
      updateCategoryList(res);
    });
  }

  render() {
    return (
      <div className="content">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TodoTopbar
              searchTodo={this.getTodoList}
            />
          </Grid>
          <Grid item xs={12}>
            <TodoList
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        <TodoUpsert
          updateList={this.updateList}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loading: () => dispatch(actions.loading()),
    openUpsertTodo: (todo) => dispatch(actions.openUpsertTodo(todo)),
    closeUpsertTodo: () => dispatch(actions.closeUpsertTodo()),
    updateTodoList: (todoList) => dispatch(actions.updateTodoList(todoList)),
    updateCategoryList: (categoryList) =>
      dispatch(actions.updateCategoryList(categoryList))
  }
}

export default connect(mapStateToProps('todo'), mapDispatchToProps)(Todo)