import React, { Component, lazy } from 'react'
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import UtilService from '../../services/utils/Util-Service';
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
    const isSearchMode = keyword && category;
    if (isSearchMode) {
      this.searchTodo(keyword, category);
    } else {
      this.getTodoList();
    }
  }

  getTodoList = () => {
    const { updateTodoList, updateCategoryList } = this.props;
    TodoService.getTodoList().then(res => {
      const categoryList = UtilService.getDistinctArray(res.map(todo => todo.category));
      updateTodoList(res);
      updateCategoryList(categoryList);
    });
  }

  searchTodo = (keyword, category) => {
    const { updateTodoList } = this.props;
    TodoService.searchTodo(keyword, category).then(res => {
      updateTodoList(res);
    })
  }

  render() {
    const { isUpsert } = this.props;
    return (
      <div className="content">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TodoTopbar
              searchTodo={this.searchTodo}
            />
          </Grid>
          <Grid item xs={12}>
            <TodoList
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        {isUpsert &&
          <TodoUpsert
            updateList={this.updateList}
          />
        }
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