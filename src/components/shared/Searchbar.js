import React, { Component } from 'react';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Search, Cancel } from '@material-ui/icons';
import { debounce } from 'lodash';

import './style/shared.scss';

export default class Searchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  handleSearch = (e) => {
    this.setState({ keyword: e.target.value });
    this.debounceSearch(e.target.value);
  }

  debounceSearch = debounce(value => {
    const props = this.props;
    props.handleSearch(value);
  }, 300)

  handleCancel = () => {
    const props = this.props;
    this.setState({ keyword: '' });
    props.handleSearch('');
    this.focusSearchInput();
  }

  focusSearchInput = () => {
    document.getElementById('search-input').focus();
  }

  cancelButton = () => {
    if (this.state.keyword !== '') {
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
        value={this.state.keyword}
        onChange={this.handleSearch}
        disabled={disabled}
        InputProps={inputProps}
      />
    )
  }
}
