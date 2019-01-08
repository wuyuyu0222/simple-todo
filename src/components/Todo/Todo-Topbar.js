import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core';

export default class TodoTopbar extends Component {
  render() {
    const { addTodo } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="outline-block">
            search area
        </div>
        </Grid>
        <Grid item xs={3}>
          <div className="outline-block">
            goto area
        </div>
        </Grid>
        <Grid item xs={3}>
          <div className="text-right">
            <Button variant='text' onClick={() => addTodo()}>add new todo</Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}
