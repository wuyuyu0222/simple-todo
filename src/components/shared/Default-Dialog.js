import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default class DefaultDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    disabled: PropTypes.bool,
    open: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleConfirm: PropTypes.func
  }

  render() {
    const { title, content, disabled, open, handleCancel, handleConfirm } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions id="default-dialog-action">
          <Button color="primary" disabled={disabled}
            onClick={handleCancel}>
            Cancel
            </Button>
          <Button color="secondary" disabled={disabled} autoFocus
            onClick={handleConfirm}>
            Confirm
            </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
