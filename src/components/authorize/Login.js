import React from 'react'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { mapStateToProps } from '../../App-Store';
import LoginForm from './Login-Form';
import RegisterForm from './Register-Form';
import './style/Login.scss';


const Login = ({ step }) => (
  <Paper className="login-block">
    <RenderChild step={step} />
  </Paper>
)

const RenderChild = ({ step }) => {
  if (step === 'login') {
    return <LoginForm />
  } else if (step === 'register') {
    return <RegisterForm />
  } else {
    return <></>
  }
}

export default connect(mapStateToProps('auth'))(Login)
