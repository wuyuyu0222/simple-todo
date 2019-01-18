import React, { Component, lazy } from 'react'
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { common } from '../../services/utils/common';
import { mapStateToProps } from '../../App-Store';
import * as actions from '../../services/todo/Todo-Actions';
import TodoService from '../../services/todo/Todo-Service';
import TodoTopbar from './Todo-Topbar';
import TodoList from './Todo-List';
import './style/todo.scss';

const TodoUpsert = lazy(() => import('./Todo-Upsert'));

class Todo extends Component {
  constructor(props) {
    super(props);
    this.service = new TodoService();
  }

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
    this.service.getTodoList().then(res => {
      const categoryList = common.getDistinctArray(res.map(todo => todo.category));
      updateTodoList(res);
      updateCategoryList(categoryList);
    });
  }

  searchTodo = (keyword, category) => {
    const { updateTodoList } = this.props;
    this.service.searchTodo(keyword, category).then(res => {
      updateTodoList(res);
    })
  }

  upsertTodo = (todo) => {
    return this.service.upsertTodo(todo);
  }

  deleteTodo = (id) => {
    return this.service.deleteTodo(id);
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
              deleteTodo={this.deleteTodo}
              updateList={this.updateList}
            />
          </Grid>
        </Grid>
        {isUpsert &&
          <TodoUpsert
            upsertTodo={this.upsertTodo}
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