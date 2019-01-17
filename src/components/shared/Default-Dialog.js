import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';


const DefaultDialog = ({
  title, content, disabled, open,
  handleCancel, handleConfirm
}) => (
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

DefaultDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func
}

export default DefaultDialog
