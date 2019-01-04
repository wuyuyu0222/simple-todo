import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Paper, Button, LinearProgress } from '@material-ui/core';
import '../styles/todo.scss';

export default class TodoList extends Component {
  static propTypes = {
    list: PropTypes.array,
    loaded: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.props.loaded();
  }


  render() {
    return (
      <Grid container spacing={24}>
        <List list={this.props.list} />
      </Grid>
    )
  }
}

const List = (props) => {
  if (props.list.length > 0) {
    const list = props.list.map(item => (
      <Grid item xs={12} key={item.id}>
        <Paper>
          <div className="todo-block">
            <div className="todo-title">{item.title}</div>
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
              <Button color="secondary">Delete</Button>
            </div>
          </div>
        </Paper>
      </Grid>
    ))
    return list;
  } else {
    return (
      <Grid item xs={12}>
        <Paper>
          <div className="todo-block">
            create new todo
        </div>
        </Paper>
      </Grid>
    )
  }
}