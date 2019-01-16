import React, { Component } from 'react'

import './style/layout.scss';

export default class Container extends Component {

  render() {
    const { children } = this.props;
    return (
      <div className="container">
        {children}
      </div>
    )
  }
}
