import React, { Component } from 'react';
import './App.scss';
import Todo from './components/Todo';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <CssBaseline>
        <div className="App">
          <Todo />
        </div>
      </CssBaseline>
    );
  }
}

export default App;
