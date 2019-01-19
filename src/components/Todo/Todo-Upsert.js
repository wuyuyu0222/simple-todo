import React, { Component } from 'react'
import { Dialog, Grid, Paper, TextField, Button } from '@material-ui/core';
import { cloneDeep } from 'lodash';

import TodoService from '../../services/todo/Todo-Service';
import UtilService from '../../services/utils/Util-Service';

export default class TodoUpsert extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState(props.todo);
  }

  getInitState = (todo) => {
    return {
      todo: cloneDeep(todo),
      valid: {
        form: false,
        progress: false,
        content: false
      },
      dirty: {
        form: false,
        progress: false,
        content: false
      },
      loading: false,
      message: ''
    };
  }

  handleInput = (e) => {
    const { todo, dirty } = this.state;
    const target = e.target.getAttribute('id');
    const modifiedTodo = Object.assign(todo, { [target]: e.target.value });
    const valid = this.checkValid(modifiedTodo);
    const modifiedDirty = Object.assign(dirty,
      { form: true, [target]: true });
    this.setState({ todo: modifiedTodo, valid: valid, dirty: modifiedDirty });
  }

  checkValid = (todo) => {
    const contentValid = !UtilService.isEmptyString(todo.content);
    const progressValid = this.checkProgressValid(todo.progress);
    return {
      form: contentValid && progressValid,
      progress: progressValid,
      content: contentValid
    };
  }

  checkProgressValid = (progress) => {
    return progress >= 0 && progress <= 100;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateList, closeUpsertTodo } = this.props;
    const { todo } = this.state;
    this.setState({ loading: true, message: '' });
    TodoService.upsertTodo(todo).then(res => {
      this.setState({ loading: false, message: 'submit success' });
      setTimeout(() => {
        updateList();
        closeUpsertTodo();
      }, 300);
    }, err => {
      this.setState({ loading: false, message: 'submit failed' });
    });
  }

  render() {
    const { open, closeUpsertTodo } = this.props;
    const { todo, valid, dirty, loading, message } = this.state;
    return (
      <Dialog open={open}>
        <Paper>
          <form className="todo-form" autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <Grid container className="form-control" spacing={16}>
              <Grid item xs={4}>
                <TextField id="title" label="Title" autoFocus fullWidth
                  value={todo.title}
                  onChange={this.handleInput}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField id="category" label="Category" fullWidth
                  value={todo.category}
                  onChange={this.handleInput}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField id="progress" label="Progress" type="number" fullWidth
                  value={todo.progress}
                  onChange={this.handleInput}
                  error={!valid.progress && dirty.progress}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="content" label="Content" rows="3" multiline fullWidth
                  value={todo.content}
                  onChange={this.handleInput}
                  error={!valid.content && dirty.content}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container className="form-action" spacing={0}>
              <Grid item xs={6}>
                <div className="todo-message">
                  <p>{message}</p>
                </div></Grid>
              <Grid item xs={6}>
                <div className="todo-action">
                  <Button color="secondary" onClick={closeUpsertTodo}>CANCEL</Button>
                  <Button variant="outlined" type="submit"
                    disabled={!valid.form || !dirty.form || loading}>SUBMIT</Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Dialog>
    )
  }
}
