import React, { Component } from 'react'
import { Grid, Button, Select, MenuItem } from '@material-ui/core';

import Searchbar from '../shared/Searchbar';

export default class TodoTopbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      category: 'all'
    }
  }

  handleSearch = (value) => {
    this.setState({ searchString: value });
    this.props.searchTodo(value, this.state.category);
  }

  handleSelect = (e) => {
    this.setState({ category: e.target.value });
    this.props.searchTodo(this.state.searchString, e.target.value);
  }

  render() {
    const { list, addTodo, disabled } = this.props;
    const menuItems = list.map((item, idx) => (
      <MenuItem key={idx} value={item}>
        {item ? item : <em>(empty category)</em>}
      </MenuItem>
    ));
    return (
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <div className="todo-search">
            <Searchbar
              handleSearch={this.handleSearch}
              disabled={disabled}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="todo-select-category">
            <Select id="goto-select" fullWidth
              value={this.state.category}
              onChange={this.handleSelect}
              disabled={this.props.disabled}
            >
              <MenuItem value={'all'}>all category</MenuItem>
              {menuItems}
            </Select>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="text-right">
            <Button className="sentence-button" variant='text' disabled={this.props.disabled} onClick={() => addTodo()}>
              add new todo
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}
