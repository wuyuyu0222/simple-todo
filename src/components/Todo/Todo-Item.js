import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Paper, Button, LinearProgress } from '@material-ui/core';

import TodoService from '../../services/todo/Todo-Service';
import DefaultDialog from '../shared/Default-Dialog';

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
      isLoading: false
    };
  }

  openDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: true });
  }

  closeDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: false });
  }

  handleEdit = () => {
    const { todo, openUpsertTodo } = this.props;
    openUpsertTodo(todo);
  }

  handleDelete = () => {
    const { todo, updateList } = this.props;
    this.setState({ isLoading: true });
    TodoService.deleteTodo(todo.id).then(res => {
      this.closeDeleteDialog();
      this.setState({ isLoading: false });
      updateList();
    })
  }



  render() {
    const { todo } = this.props;
    const { isDeleteDialogOpen, isLoading } = this.state;
    const status = (todo.progress > 0 && todo.progress < 100) ? todo.progress + '%' :
      todo.progress === 0 ? 'ready' :
        todo.progress === 100 ? 'done' : 'unknown';
    const renderContent = todo.content.split('\n').map((todo, idx) => <p key={idx}>{todo}</p>);
    const modifiedAt = new Date(todo.modifiedAt).toLocaleString();
    return (
      <>
        <Paper>
          <div className="todo-block">
            <div className="todo-title">
              <span>{todo.title}</span>
              <span className="title-category">{todo.category}</span>
            </div>
            <div className="todo-progress">
              {status}
              <LinearProgress variant="determinate" color="primary"
                value={todo.progress} />
            </div>
            <div className="todo-content">{renderContent}</div>
            <div className="todo-author">{todo.userId} at {modifiedAt}</div>
            <div className="todo-action">
              <Button onClick={this.handleEdit}>Edit</Button>
              <Button color="secondary"
                onClick={this.openDeleteDialog}>Delete</Button>
            </div>
          </div>
        </Paper>
        <DefaultDialog
          title={'Confirm to delete this todo?'}
          content={`todo title "${todo.title}"`}
          disabled={isLoading}
          open={isDeleteDialogOpen}
          handleCancel={this.closeDeleteDialog}
          handleConfirm={this.handleDelete}
        />
      </>
    )
  }
}
