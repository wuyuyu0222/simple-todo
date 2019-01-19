import React, { Component } from 'react'
import { connect } from 'react-redux';
import { AppBar, Button, Grid } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';

import AuthService from '../../services/authorize/Auth-Service';
import { mapStateToProps } from '../../App-Store';
import * as actions from '../../services/authorize/Auth-Actions';
import './style/layout.scss';



class Topbar extends Component {

  logout = () => {
    const { logout } = this.props;
    AuthService.logout().then(res => {
      logout();
    });
  }

  render() {
    const { username } = this.props;
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
              <span className="topbar-user">{username}</span>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps('auth'), mapDispatchToProps)(Topbar)
