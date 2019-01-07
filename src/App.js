import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import './App.scss';
import Container from './layouts/Container';
import Todo from './components/Todo';

class App extends Component {
  render() {
    return (
      <CssBaseline>
        <Router>
          <Suspense fallback={<div>Loading</div>}>
            <div className="App">
              <Container>
                <Todo />
              </Container>
            </div>
          </Suspense>
        </Router>
      </CssBaseline>
    );
  }
}

export default App;
