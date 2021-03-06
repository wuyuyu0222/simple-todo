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

  render() {
    return (
      <Grid container spacing={16}>
        <RenderChild props={this.props} />
      </Grid>
    );
  }
}

const RenderChild = ({ props }) => {
  const { todoList, openUpsertTodo, updateList } = props;
  if (todoList.length > 0) {
    return todoList.map(item => (
      <Grid item xs={12} key={item.id}>
        <TodoItem
          todo={item}
          openUpsertTodo={openUpsertTodo}
          updateList={updateList}
        />
      </Grid>
    ));
  } else {
    return (
      <Grid item xs={12}>
        <div className="todo-block">
          <div className="todo-empty">
            <span>your todo list is empty</span>
          </div>
        </div>
      </Grid>
    )
  }
}
