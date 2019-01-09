import React, { Component } from 'react'
import { Grid, Button, Select, MenuItem } from '@material-ui/core';
import Searchbar from '../../layouts/Searchbar';

export default class TodoTopbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    }
  }

  gotoTodo = (e) => {
    this.cancelSearch();
    this.setState({ selectedValue: e.target.value });
    this.props.gotoTodo(e.target.value);
  }

  render() {
    const { list, addTodo, searchTodo, disabled } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <div className="todo-search">
            <Searchbar
              handleSearch={searchTodo}
              disabled={disabled}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="todo-goto">
            <Select id="goto-select" displayEmpty fullWidth
              value={this.state.selectedValue}
              onChange={this.gotoTodo}
              disabled={this.props.disabled}
            >
              <MenuItem value={''}>all</MenuItem>
              {list.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title ? item.title : <em>(empty title todo)</em>}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="text-right">
            <Button variant='text' disabled={this.props.disabled} onClick={() => addTodo()}>
              add new todo
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}
