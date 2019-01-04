import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoAdd extends Component {
  static propTypes = {
    loaded: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.props.loaded();
  }


  render() {
    return (
      <div>
        Add
      </div>
    )
  }
}
