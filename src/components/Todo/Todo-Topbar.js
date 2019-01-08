import React, { Component } from 'react'
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

export default class TodoTopbar extends Component {

  componentDidMount() {
    document.getElementById('search-input')
      .addEventListener('search', (e) => this.props.searchTodo(e.target.value))
  }

  componentWillUnmount() {
    document.getElementById('search-input')
      .removeEventListener('search', (e) => this.props.searchTodo(e.target.value));
  }

  render() {
    const { addTodo } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <div className="todo-search">
            <TextField id="search-input" placeholder="Search" type="search" variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }} />
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
