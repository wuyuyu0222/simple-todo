import React, { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core';

import { Common } from '../../services/utils/common';
import { store } from '../../App-store';
import { login } from '../../services/authorize/actions';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  getInitState = () => {
    return {
      account: '',
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
    const isAccountValid = !Common.isEmptyString(info.account);
    const isPasswordValid = !Common.isEmptyString(info.password);
    return {
      form: isAccountValid && isPasswordValid,
      account: isAccountValid,
      password: isPasswordValid
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    store.dispatch(login(this.state.account, this.state.password));
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
