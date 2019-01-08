import React, { Component } from 'react'
import { Grid, Button, IconButton, TextField, InputAdornment, Select, MenuItem } from '@material-ui/core';
import { Search, Cancel } from '@material-ui/icons';

export default class TodoTopbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      selectedValue: ''
    }
  }

  handleSearch = (e) => {
    this.setState({ searchString: e.target.value });
    this.props.searchTodo(e.target.value);
  }

  gotoTodo = (e) => {
    this.cancelSearch();
    this.setState({ selectedValue: e.target.value });
    this.props.gotoTodo(e.target.value);
  }

  cancelButton = () => {
    if (this.state.searchString !== '') {
      return (
        <InputAdornment position="end">
          <IconButton aria-label="Cancel" className="input-button"
            onClick={this.cancelSearch}>
            <Cancel fontSize="small" />
          </IconButton>
        </InputAdornment>
      )
    }
  }

  cancelSearch = () => {
    this.setState({ searchString: '' });
    this.props.searchTodo('');
    document.getElementById('search-input').focus();
  }

  render() {
    const { list, addTodo } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <div className="todo-search">
            <TextField id="search-input" placeholder="Search" type="text" variant="outlined"
              value={this.state.searchString}
              onChange={this.handleSearch}
              disabled={this.props.disabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: this.cancelButton()
              }} />
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
