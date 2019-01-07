import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import Topbar from './Topbar';
export default class Container extends Component {

  render() {
    return (
      <div className="container">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Topbar />
          </Grid>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    )
  }
}
