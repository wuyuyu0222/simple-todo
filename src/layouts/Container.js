import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
export default class Container extends Component {

  render() {
    return (
      <div className="container">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    )
  }
}
