import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core';

import TodoItem from './Todo-Item';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.array,
    disabled: PropTypes.bool,
    editTodo: PropTypes.func,
    deleteTodo: PropTypes.func
  }

  render() {
    const { list, disabled, editTodo, deleteTodo, updateList } = this.props;
    if (list.length > 0) {
      const todoItems = list.map(item => (
        <Grid item xs={12}>
          <TodoItem
            todo={item}
            disabled={disabled}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            updateList={updateList}
          />
        </Grid>
      ))
      return (
        <Grid container spacing={16}>
          {todoItems}
        </Grid>
      )
    } else {
      return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <div className="todo-block">
              <div className="todo-empty">
                <span>your todo list is empty</span>
              </div>
            </div>
          </Grid>
        </Grid>
      )
    }
  }
}
