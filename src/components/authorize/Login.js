import React, { Component } from 'react'
import { Paper } from '@material-ui/core';

import { store } from '../../utils/store';
import { toLogin, toRegister } from './actions';
import LoginForm from './Login-Form';
import RegisterForm from './Register-Form';
import './Login.scss';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  toLogin = () => {
    store.dispatch(toLogin());
  }

  toRegister = () => {
    store.dispatch(toRegister());
  }

  render() {
    const { step } = this.state;
    const RenderChild = () => {
      if (step === 'login') {
        return <LoginForm toRegister={this.toRegister} />
      } else if (step === 'register') {
        return <RegisterForm toLogin={this.toLogin} />
      } else {
        return <></>
      }
    }
    return (
      <Paper className="login-block">
        <RenderChild />
      </Paper>
    )
  }
}
