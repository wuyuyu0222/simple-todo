import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Paper, Button, LinearProgress } from '@material-ui/core';
import './todo.scss';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.array,
    deleteTodo: PropTypes.func
  }

  render() {
    const { list, deleteTodo } = this.props;
    if (list.length > 0) {
      return (
        <Grid container spacing={24}>
          {list.map(item => (
            <Grid item xs={12} key={item.id}>
              <Paper>
                <div className="todo-block">
                  <div className="todo-title"><span>{item.title}</span></div>
                  <div className="todo-progress">
                    {(item.progress > 0 && item.progress < 100) ? item.progress + '%' : item.status}
                    <LinearProgress classes={{
                      colorPrimary: 'primary-progress-color',
                      barColorPrimary: 'primary-progress-bar-color'
                    }}
                      variant="determinate" color="primary" value={item.progress} />
                  </div>
                  <div className="todo-content">{item.content}</div>
                  <div className="todo-author">{item.userId} at {item.modifiedAt.toLocaleDateString()}</div>
                  <div className="todo-action">
                    <Button>Edit</Button>
                    <Button color="secondary" onClick={() => deleteTodo(item.id)}>Delete</Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )
    } else {
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper>
              <div className="todo-block">
                create new todo
          </div>
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }
}
