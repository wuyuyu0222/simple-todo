import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core';

import TodoItem from './Todo-Item';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.array,
    upsert: PropTypes.bool,
    editTodo: PropTypes.func,
    deleteTodo: PropTypes.func
  }

  render() {
    const { list, editTodo, deleteTodo } = this.props;
    if (list.length > 0) {
      return (
        <Grid container spacing={16}>
          {list.map(item => (
            <Grid item xs={12} key={item.id}>
              <TodoItem
                todo={item}
                editTodo={editTodo}
                deleteTodo={deleteTodo} />
            </Grid>
          ))}
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
