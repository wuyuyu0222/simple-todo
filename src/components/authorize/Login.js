import React, { Component } from 'react'
import { Paper } from '@material-ui/core';

import LoginForm from './Login-Form';
import RegisterForm from './Register-Form';
import './style/Login.scss';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 'login'
    };
  }

  toLogin = () => {
    this.setState({ step: 'login' });
  }

  toRegister = () => {
    this.setState({ step: 'register' });
  }

  render() {
    const { step } = this.state;
    const { login } = this.props;
    return (
      <Paper className="login-block">
        <RenderChild step={step}
          login={login}
          toLogin={this.toLogin} toRegister={this.toRegister} />
      </Paper>
    )
  }
}

const RenderChild = ({ step, login, toLogin, toRegister }) => {
  if (step === 'login') {
    return <LoginForm toRegister={toRegister} login={login} />
  } else if (step === 'register') {
    return <RegisterForm toLogin={toLogin} />
  } else {
    return <></>
  }
}
