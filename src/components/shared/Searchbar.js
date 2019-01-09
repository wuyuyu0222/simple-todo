import React, { Component } from 'react';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Search, Cancel } from '@material-ui/icons';

import './shared.scss';

export default class Searchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
  }

  handleSearch = (e) => {
    this.setState({ searchString: e.target.value });
    this.props.handleSearch(e.target.value);
  }

  handleCancel = () => {
    this.setState({ searchString: '' });
    this.props.handleSearch('');
    document.getElementById('search-input').focus();
  }

  cancelButton = () => {
    if (this.state.searchString !== '') {
      return (
        <InputAdornment position="end">
          <IconButton aria-label="Cancel" className="input-button"
            onClick={this.handleCancel}>
            <Cancel fontSize="small" />
          </IconButton>
        </InputAdornment>
      )
    }
  }

  render() {
    const { disabled } = this.props;
    return (
      <TextField id="search-input" placeholder="Search" type="text" variant="outlined"
        value={this.state.searchString}
        onChange={this.handleSearch}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: this.cancelButton()
        }} />
    )
  }
}
