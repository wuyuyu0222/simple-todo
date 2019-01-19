import React, { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core';

import UtilService from '../../services/utils/Util-Service';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  getInitState = () => {
    const tempAccount = localStorage.getItem('tempAccount');
    return {
      account: tempAccount,
      password: '',
      valid: {
        form: false,
        account: false,
        password: false
      },
      dirty: {
        form: false,
        account: false,
        password: false
      },
      loading: false,
      error: ''
    };
  }

  handleInput = (e) => {
    const { account, password } = this.state;
    const target = e.target.id;
    const modifiedInfo = Object.assign(
      {
        account: account,
        password: password
      },
      { [target]: e.target.value }
    );
    this.setState({
      [target]: e.target.value,
      valid: this.checkValid(modifiedInfo),
      dirty: {
        form: true,
        [target]: true
      }
    });
  }

  checkValid = (info) => {
    const isAccountValid = !UtilService.isEmptyString(info.account);
    const isPasswordValid = !UtilService.isEmptyString(info.password);
    return {
      form: isAccountValid && isPasswordValid,
      account: isAccountValid,
      password: isPasswordValid
    };
  }

  handleSubmit = (e) => {
    const { login } = this.props;
    const { account, password } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    login(account, password);
  }

  render() {
    const { toRegister } = this.props;
    const { account, password, valid, dirty, loading, error } = this.state;
    return (
      <form className="login-form" autoComplete="off"
        onSubmit={this.handleSubmit}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <div className="form-title">
              Simple Todo
              </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control">
              <TextField id="account" label="Account" autoFocus fullWidth
                value={account}
                error={dirty.account && !valid.account}
                onChange={this.handleInput}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control">
              <TextField id="password" label="Password" type="password" fullWidth
                value={password}
                error={dirty.password && !valid.password}
                onChange={this.handleInput}
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
              disabled={!valid.form || !dirty.form || loading}>Login</Button>
            <Button size="small" className="btn-text"
              onClick={toRegister} disabled={loading}>create new account</Button>
          </div>
        </Grid>
      </form>
    )
  }
}
