import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dialog, Grid, Paper, TextField, Button } from '@material-ui/core';
import { cloneDeep } from 'lodash';

import { mapStateToProps } from '../../App-Store';
import * as actions from '../../services/todo/Todo-Actions';

class TodoUpsert extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState(props.selectedTodo);
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

  handleCancel = () => {
    const { selectedTodo, closeUpsertTodo } = this.props;
    this.setState(this.getInitState(selectedTodo));
    closeUpsertTodo();
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
    const contentValid = this.checkContentValid(todo.content);
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

  checkContentValid = (content) => {
    return content !== '';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { upsertTodo, updateList, closeUpsertTodo } = this.props;
    const { todo } = this.state;
    this.setState({ loading: true, message: '' });
    upsertTodo(todo).then(res => {
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
    const { isUpsert } = this.props;
    const { todo, valid, dirty, loading, message } = this.state;
    return (
      <Dialog open={isUpsert}>
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
                  <Button color="secondary" onClick={this.handleCancel}>CANCEL</Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    closeUpsertTodo: () => dispatch(actions.closeUpsertTodo())
  }
};


export default connect(mapStateToProps('todo'), mapDispatchToProps)(TodoUpsert);