import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TodoList from './Todo-List';
import TodoAdd from './Todo-Add';
import db from '../utils/database';

import { Grid, Button } from '@material-ui/core';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.db = db
    this.todoList = this.db.todo;
    this.state = {
      activeRoute: ''
    };
  }

  loadRoute = (route) => {
    this.setState({ activeRoute: route });
  }

  render() {
    const { activeRoute } = this.state;
    return (
      <Router>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={3}>
                <div className="button-container">
                  <Button variant={activeRoute === '' ? "outlined" : 'text'} component={Link} to="/">LIST</Button>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="button-container">
                  <Button variant={activeRoute === 'add' ? "outlined" : 'text'} component={Link} to="add">ADD</Button>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="button-container">
                  <Button variant="text" component={Link} to="/">TEMP</Button>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="button-container">
                  <Button variant="text" component={Link} to="/">TEMP</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Route exact path="/" render={props => <TodoList list={this.todoList} loaded={() => this.loadRoute('')} {...props} />} />
            <Route path="/add" render={props => <TodoAdd loaded={() => this.loadRoute('add')} {...props} />} />
          </Grid>
        </Grid>
      </Router>
    )
  }
}
