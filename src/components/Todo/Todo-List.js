import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Paper, Button, LinearProgress } from '@material-ui/core';
import './todo.scss';

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
              <Paper>
                <div className="todo-block">
                  <div className="todo-title">
                    <span>{item.title}</span>
                    <span className="title-category">{item.category}</span>
                  </div>
                  <div className="todo-progress">
                    {(item.progress > 0 && item.progress < 100) ? item.progress + '%' :
                      item.progress === 0 ? 'ready' : item.progress === 100 ? 'done' : 'unknown'}
                    <LinearProgress variant="determinate" color="primary" value={item.progress} />
                  </div>
                  <div className="todo-content">{item.content.split('\n').map((item, idx) => <p key={idx}>{item}</p>)}</div>
                  <div className="todo-author">{item.userId} at {item.modifiedAt.toLocaleDateString()}</div>
                  <div className="todo-action">
                    <Button disabled={this.props.upsert} onClick={() => editTodo(item.id)}>Edit</Button>
                    <Button color="secondary" disabled={this.props.upsert} onClick={() => deleteTodo(item.id)}>Delete</Button>
                  </div>
                </div>
              </Paper>
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
