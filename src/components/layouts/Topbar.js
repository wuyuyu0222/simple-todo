import React, { Component } from 'react'
import { AppBar, Button, Grid } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';

import { store } from '../../App-store';
import { logout } from '../../services/authorize/actions';
import './style/layout.scss';


export default class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();

  }

  logout = () => {
    store.dispatch(logout());
  }

  render() {
    return (
      <div className="topbar">
        <AppBar position="fixed" color="default"
          className="topbar-container">
          <Grid container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className="topbar-grid"
            spacing={0}
          >
            <Grid item className="topbar-info" xs={2}>
              <AccountCircleOutlined className="icon-margin-fix mr-1x" />
              <span className="topbar-user">{this.state.userName}</span>
            </Grid>
            <Grid item xs={1}>
              <Button onClick={this.logout}>logout</Button>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    )
  }
}
