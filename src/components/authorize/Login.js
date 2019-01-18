import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { mapStateToProps } from '../../App-Store';
import AuthService from '../../services/authorize/Auth-Service';
import LoginForm from './Login-Form';
import RegisterForm from './Register-Form';
import './style/Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
  }

  login = (account, password) => {
    return this.service.login(account, password);
  }

  register = (username, account, password) => {
    return this.service.register(username, account, password);
  }

  render() {
    const props = {
      step: this.props.step,
      login: this.login,
      register: this.register
    };
    return (
      <Paper className="login-block">
        <RenderChild props={props} />
      </Paper>
    )
  }
}

const RenderChild = ({ props }) => {
  const { step, login, register } = props;
  if (step === 'login') {
    return <LoginForm login={login} />
  } else if (step === 'register') {
    return <RegisterForm register={register} />
  } else {
    return <></>
  }
}

export default connect(mapStateToProps('auth'))(Login)
