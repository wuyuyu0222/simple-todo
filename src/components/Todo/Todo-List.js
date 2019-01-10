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

  constructor(props) {
    super(props);
    this.state = { isDeleteDialogOpen: false };
  }

  onDeleteDialogOpen = () => {
    this.setState({ isDeleteDialogOpen: true });
  }

  onDeleteDialogClose = () => {
    this.setState({ isDeleteDialogOpen: false });
  }

  render() {
    const { list, disabled, editTodo, deleteTodo, updateList } = this.props;
    const { isDeleteDialogOpen } = this.state;
    if (list.length > 0) {
      const todoItems = list.map(item => (
        <Grid item xs={12} key={item.id}>
          <TodoItem
            todo={item}
            disabled={disabled || isDeleteDialogOpen}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            updateList={updateList}
            onDeleteDialogOpen={this.onDeleteDialogOpen}
            onDeleteDialogClose={this.onDeleteDialogClose}
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
