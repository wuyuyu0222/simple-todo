import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import db from '../utils/database';
import { Grid, Button } from '@material-ui/core';

const TodoList = lazy(() => import('./Todo-List'));
const TodoAdd = lazy(() => import('./Todo-Add'));

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.db = db
    this.todoList = this.db.todo;
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading</div>}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <Route exact path="/" render={props => <TodoList list={this.todoList} {...props} />} />
              <Route path="/add" render={props => <TodoAdd {...props} />} />
            </Grid>
          </Grid>
        </Suspense>
      </Router>
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