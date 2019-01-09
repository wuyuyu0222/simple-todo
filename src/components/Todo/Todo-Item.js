import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Paper, Button, LinearProgress } from '@material-ui/core';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    editTodo: PropTypes.func,
    deleteTodo: PropTypes.func
  }
  render() {
    const { todo, editTodo, deleteTodo } = this.props;
    return (
      <Paper>
        <div className="todo-block">
          <div className="todo-title">
            <span>{todo.title}</span>
            <span className="title-category">{todo.category}</span>
          </div>
          <div className="todo-progress">
            {(todo.progress > 0 && todo.progress < 100) ? todo.progress + '%' :
              todo.progress === 0 ? 'ready' : todo.progress === 100 ? 'done' : 'unknown'}
            <LinearProgress variant="determinate" color="primary" value={todo.progress} />
          </div>
          <div className="todo-content">{todo.content.split('\n').map((todo, idx) => <p key={idx}>{todo}</p>)}</div>
          <div className="todo-author">{todo.userId} at {todo.modifiedAt.toLocaleDateString()}</div>
          <div className="todo-action">
            <Button disabled={this.props.upsert} onClick={() => editTodo(todo.id)}>Edit</Button>
            <Button color="secondary" disabled={this.props.upsert} onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </div>
        </div>
      </Paper>
    )
  }
}
