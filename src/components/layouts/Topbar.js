import React from 'react'
import { connect } from 'react-redux';
import { AppBar, Button, Grid } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';

import { mapStateToProps } from '../../App-Store';
import { logout } from '../../services/authorize/Auth-Actions';
import './style/layout.scss';


const Topbar = ({ username, logout }) => (
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
          <span className="topbar-user">{username}</span>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={logout}>logout</Button>
        </Grid>
      </Grid>
    </AppBar>
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps('auth'), mapDispatchToProps)(Topbar)
