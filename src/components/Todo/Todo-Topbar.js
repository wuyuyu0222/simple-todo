import React, { Component } from 'react'
import { Grid, Button, Select, MenuItem } from '@material-ui/core';

import TodoService from '../../services/todo/Todo-Service';
import Searchbar from '../shared/Searchbar';

export default class TodoTopbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      category: 'all'
    }
  }

  addTodo = () => {
    const { openUpsertTodo } = this.props;
    const { category } = this.state;
    const newTodo = TodoService.getEmptyTodo();
    newTodo.category = category === 'all' ? '' : category;
    openUpsertTodo(newTodo);
  }

  handleSearch = (value) => {
    const { searchTodo } = this.props;
    const { category } = this.state;
    this.setState({ searchString: value });
    searchTodo(value, category);
  }

  handleSelect = (e) => {
    const { searchTodo } = this.props;
    const { searchString } = this.state;
    this.setState({ category: e.target.value });
    searchTodo(searchString, e.target.value);
  }

  render() {
    const { categoryList } = this.props;
    const { category } = this.state;
    const renderItems = categoryList.map((item, idx) => (
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
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="todo-select-category">
            <Select id="goto-select" fullWidth
              value={category}
              onChange={this.handleSelect}
            >
              <MenuItem value={'all'}>all category</MenuItem>
              {renderItems}
            </Select>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="text-right">
            <Button className="sentence-button" variant='text'
              onClick={this.addTodo}>
              add new todo
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}
