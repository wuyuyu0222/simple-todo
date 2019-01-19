import React, { Component } from 'react'

import AuthService from '../../services/authorize/Auth-Service';
import Topbar from './Topbar';
import Todo from '../todo/Todo';
import Login from '../authorize/Login';
import './style/layout.scss';

export default class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: AuthService.isAuthorized
    };
  }

  login = (account, password) => {
    AuthService.login(account, password).then(res => {
      this.setState({ isAuthorized: true });
    })
  }

  logout = () => {
    AuthService.logout().then(res => {
      this.setState({ isAuthorized: false });
    });
  }

  render() {
    const { isAuthorized } = this.state;
    const username = localStorage.getItem('user');
    return (
      <div className="container">
        <RenderChild
          isAuthorized={isAuthorized}
          username={username}
          login={this.login} logout={this.logout} />
      </div>
    )
  }
}
const RenderChild = ({ isAuthorized, username, login, logout }) => {
  if (isAuthorized) {
    return (
      <>
        <Topbar username={username} logout={logout} />
        <Todo />
      </>
    )
  } else {
    return (
      <Login login={login} />
    )
  }
}
