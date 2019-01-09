import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Paper, Button, LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    disabled: PropTypes.bool,
    editTodo: PropTypes.func,
    deleteTodo: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      isDeleteDialogOpen: false,
      loading: false
    };
  }

  openDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: true });
  }

  closeDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: false });
  }

  handleDelete = () => {
    this.setState({ loading: true });
    this.props.deleteTodo(this.props.todo.id).then(res => {
      this.props.updateList();
    })
  }

  render() {
    const { todo, disabled, editTodo } = this.props;
    return (
      <>
        <Paper>
          <div className="todo-block">
            <div className="todo-title">
              <span>{todo.title}</span>
              <span className="title-category">{todo.category}</span>
            </div>
            <div className="todo-progress">
              {(todo.progress > 0 && todo.progress < 100) ? todo.progress + '%' :
                todo.progress === 0 ? 'ready' : todo.progress === 100 ? 'done' : 'unknown'}
              <LinearProgress variant="determinate" color="primary" value={todo.progress} />
            </div>
            <div className="todo-content">{todo.content.split('\n').map((todo, idx) => <p key={idx}>{todo}</p>)}</div>
            <div className="todo-author">{todo.userId} at {todo.modifiedAt.toLocaleDateString()}</div>
            <div className="todo-action">
              <Button disabled={disabled} onClick={() => editTodo(todo.id)}>Edit</Button>
              <Button color="secondary" disabled={disabled} onClick={this.openDeleteDialog}>Delete</Button>
            </div>
          </div>
        </Paper>
        <Dialog
          open={this.state.isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm to delete this todo?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`todo title "${todo.title}"`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" disabled={this.state.loading}
              onClick={this.closeDeleteDialog}>
              Cancel
            </Button>
            <Button color="secondary" disabled={this.state.loading} autoFocus
              onClick={this.handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
