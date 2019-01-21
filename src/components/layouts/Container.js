import React from 'react'
import { connect } from 'react-redux';

import Topbar from './Topbar';
import Todo from '../todo/Todo';
import Login from '../authorize/Login';
import './style/layout.scss';

const Container = ({ isAuthorized }) => {
  return (
    <div className="container">
      <RenderChild isAuthorized={isAuthorized} />
    </div>
  )
}
const RenderChild = ({ isAuthorized }) => {
  if (isAuthorized) {
    return (
      <>
        <Topbar />
        <Todo />
      </>
    )
  } else {
    return (
      <Login />
    )
  }
}

export default connect((state) => state.auth)(Container)