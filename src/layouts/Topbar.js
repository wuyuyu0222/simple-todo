import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

export default class Topbar extends Component {
  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <OutlinedLink exact={true} to="/" label="LIST" />
        </Grid>
        <Grid item xs={3}>
          <OutlinedLink exact={false} to="/add" label="ADD" />
        </Grid>
        <Grid item xs={3}>
          <OutlinedLink exact={false} to="/temp" label="TEMP" />
        </Grid>
        <Grid item xs={3}>
          <OutlinedLink exact={false} to="/temp" label="TEMP" />
        </Grid>
      </Grid>
    )
  }
}

const OutlinedLink = ({ exact, to, label }) => {
  return (
    <div className="button-container">
      <Route path={to}
        exact={exact}
        children={({ match }) => (
          <Button variant={match ? "outlined" : 'text'} component={Link} to={to}>{label}</Button>
        )}
      />
    </div>
  )
}
