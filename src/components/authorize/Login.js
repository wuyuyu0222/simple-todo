import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import LoginForm from './Login-Form';
import RegisterForm from './Register-Form';
import './style/Login.scss';

class Login extends Component {

  render() {
    const { step } = this.props;
    return (
      <Paper className="login-block">
        <RenderChild step={step} />
      </Paper>
    )
  }
}

const RenderChild = ({ step }) => {
  if (step === 'login') {
    return <LoginForm />
  } else if (step === 'register') {
    return <RegisterForm />
  } else {
    return <></>
  }
}

export default connect((state) => state.auth)(Login)
