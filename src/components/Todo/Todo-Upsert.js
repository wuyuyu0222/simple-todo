import React, { Component } from 'react'
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import { cloneDeep } from 'lodash';

export default class TodoUpsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      dirty: false,
      loading: false,
      message: ''
    };

    this.todo = cloneDeep(this.props.todo);
  }

  handleCancel = () => {
    this.todo = {
      title: '',
      category: '',
      progress: 0,
      content: ''
    }
    this.setState({
      formValid: false,
      dirty: false,
      loading: false,
      message: ''
    });
    this.props.cancelTodo();
  }

  handleInput = (e) => {
    const target = e.target.getAttribute('id');
    this.todo[target] = e.target.value;
    if (this.checkContentValid(this.todo.content) && this.checkProgressValid(this.todo.progress)) {
      this.setState({ formValid: true, dirty: true });
    } else {
      this.setState({ formValid: false, dirty: true });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, message: '' });
    const newDate = new Date();
    if (!this.todo.id) {
      this.todo.createAt = newDate;
    }
    this.todo.modifiedAt = newDate;
    this.props.upsertTodo(this.todo).then(res => {
      this.setState({ message: 'submit success' });
      setTimeout(() => this.props.updateList(), 300);
    }, err => {
      this.setState({ loading: false, message: 'submit failed' });
    });
  }

  checkProgressValid = (progress) => {
    return progress >= 0 && progress <= 100;
  }

  checkContentValid = (content) => {
    return content !== '';
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Paper>
            <form className="todo-form" onSubmit={this.handleSubmit} autoComplete="off">
              <Grid container spacing={16}>
                <Grid item xs={4}>
                  <TextField id="title" label="Title" value={this.todo.title} onChange={this.handleInput} fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField id="category" label="Category" value={this.todo.category} onChange={this.handleInput} fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField id="progress" label="Progress" value={this.todo.progress} onChange={this.handleInput} error={this.state.dirty && !this.checkProgressValid(this.todo.progress)} fullWidth type="number"></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="content" label="Content" value={this.todo.content} onChange={this.handleInput} error={this.state.dirty && !this.checkContentValid(this.todo.content)} fullWidth multiline rows="3"></TextField>
                </Grid>
                <Grid item xs={6}>
                  <div className="todo-message">
                    <p>{this.state.message}</p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="todo-action">
                    <Button color="secondary" onClick={this.handleCancel}>CANCEL</Button>
                    <Button variant="outlined" type="submit" disabled={!this.state.formValid || !this.state.dirty || this.state.loading}>SUBMIT</Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
