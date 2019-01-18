import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Select, MenuItem } from '@material-ui/core';

import { mapStateToProps } from '../../App-Store';
import TodoService from '../../services/todo/Todo-Service';
import * as actions from '../../services/todo/Todo-Actions';
import Searchbar from '../shared/Searchbar';

class TodoTopbar extends Component {

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
    const { categoryList, isLoading } = this.props;
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
              disabled={isLoading}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="todo-select-category">
            <Select id="goto-select" fullWidth
              value={category}
              onChange={this.handleSelect}
              disabled={isLoading}
            >
              <MenuItem value={'all'}>all category</MenuItem>
              {renderItems}
            </Select>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="text-right">
            <Button className="sentence-button" variant='text'
              disabled={isLoading}
              onClick={this.addTodo}>
              add new todo
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openUpsertTodo: (todo) => dispatch(actions.openUpsertTodo(todo))
  }
};

export default connect(mapStateToProps('todo'), mapDispatchToProps)(TodoTopbar)