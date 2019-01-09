import React, { Component } from 'react'
import { Grid, Button, Select, MenuItem } from '@material-ui/core';
import Searchbar from '../../layouts/Searchbar';

export default class TodoTopbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'all'
    }
  }

  selectTodo = (e) => {
    this.setState({ selectedValue: e.target.value });
    this.props.selectTodo(e.target.value);
  }

  render() {
    const { list, addTodo, searchTodo, disabled } = this.props;
    const categoryList = [...(new Set(list.map(todo => todo.category)))]
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
          <div className="todo-select-category">
            <Select id="goto-select" fullWidth
              value={this.state.selectedValue}
              onChange={this.selectTodo}
              disabled={this.props.disabled}
            >
              <MenuItem value={'all'}>all category</MenuItem>
              {categoryList.map((item, idx) => (
                <MenuItem key={idx} value={item}>
                  {item ? item : <em>(empty category)</em>}
                </MenuItem>
              ))}
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
