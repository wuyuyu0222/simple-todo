import React, { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core';

import { Common } from '../../services/utils/common';
import { store } from '../../App-store';
import { register } from '../../services/authorize/actions';

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  getInitState = () => {
    return {
      username: '',
      account: '',
      password: '',
      confirmPassword: '',
      valid: {
        form: false,
        username: false,
        account: false,
        password: false,
        confirmPassword: false
      },
      dirty: {
        form: false,
        username: false,
        account: false,
        password: false
      },
      loading: false,
      error: ''
    };
  }

  handleInput = (e) => {
    const { username, account, password, confirmPassword } = this.state;
    const target = e.target.id;
    const modifiedInfo = Object.assign(
      {
        username: username,
        account: account,
        password: password,
        confirmPassword: confirmPassword
      },
      { [target]: e.target.value }
    );
    const valid = this.checkValid(modifiedInfo);
    this.setState({
      [target]: e.target.value,
      valid: valid
    });
  }

  handleInputBlur = (e) => {
    const target = e.target.id;
    this.setState({
      dirty: {
        form: true,
        [target]: true
      }
    });
  }

  checkValid = (info) => {
    const isUsernameValid = !Common.isEmptyString(info.username);
    const isAccountValid = !Common.isEmptyString(info.account);
    const isPasswordValid = this.checkPasswordValid(info.password);
    const isConfirmPasswordValid =
      this.checkConfirmPasswordValid(info.password, info.confirmPassword);
    return {
      form: isUsernameValid && isAccountValid &&
        isPasswordValid && isConfirmPasswordValid,
      username: isUsernameValid,
      account: isAccountValid,
      password: isPasswordValid,
      confirmPassword: isConfirmPasswordValid
    };
  }

  checkPasswordValid = (password) => {
    if (!password ||
      password.length < 6) {
      return false;
    }
    return true;
  }

  checkConfirmPasswordValid = (password, confirmPassword) => {
    if (!confirmPassword ||
      password !== confirmPassword) {
      return false;
    }
    return true;
  }

  handleSubmit = (e) => {
    const { username, account, password } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    store.dispatch(
      register(account, password, username)
    );
  }

  render() {
    const { toLogin } = this.props;
    const { username, account, password, confirmPassword,
      valid, dirty, loading, error } = this.state;
    return (
      <form className="login-form" autoComplete="off"
        onSubmit={this.handleSubmit}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <div className="form-control">
              <TextField id="username" label="Username" autoFocus fullWidth
                value={username}
                error={dirty.username && !valid.username}
                onChange={this.handleInput}
                onBlur={this.handleInputBlur}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control">
              <TextField id="account" label="Account" fullWidth
                value={account}
                error={dirty.account && !valid.account}
                onChange={this.handleInput}
                onBlur={this.handleInputBlur}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="form-control">
              <TextField id="password" label="Password" type="password" fullWidth
                value={password}
                error={dirty.password && !valid.password}
                onChange={this.handleInput}
                onBlur={this.handleInputBlur}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="form-control">
              <TextField id="confirmPassword" label="Confirm" type="password" fullWidth
                value={confirmPassword}
                error={dirty.confirmPassword && !valid.confirmPassword}
                onChange={this.handleInput}
                onBlur={this.handleInputBlur}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-error">
              {error}
            </div>
          </Grid>
          <div className="form-action">
            <Button variant="outlined" type="submit"
              disabled={!valid.form || !dirty.form || loading}>Register</Button>
            <Button size="small" className="btn-text"
              onClick={toLogin} disabled={loading}>back to login</Button>
          </div>
        </Grid>
      </form>
    )
  }
}
