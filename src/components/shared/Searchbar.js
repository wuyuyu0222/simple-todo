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
    const props = this.props;
    this.setState({ searchString: e.target.value });
    props.handleSearch(e.target.value);
  }

  handleCancel = () => {
    const props = this.props;
    this.setState({ searchString: '' });
    props.handleSearch('');
    this.focusSearchInput();
  }

  focusSearchInput = () => {
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
    const inputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
      endAdornment: this.cancelButton()
    };
    return (
      <TextField id="search-input" placeholder="Search" type="text" variant="outlined"
        value={this.state.searchString}
        onChange={this.handleSearch}
        disabled={disabled}
        InputProps={inputProps}
      />
    )
  }
}
