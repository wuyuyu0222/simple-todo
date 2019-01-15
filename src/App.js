import React, { Component, Suspense } from 'react';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './App.scss';
import Container from './layouts/Container';
import Todo from './components/Todo/Todo';
import { Environment } from './environment';

class App extends Component {
  // TODO: logout & user info bar
  // login error handler
  // jwt token
  // login && register with backend
  // better authorzie service (redux?)
  constructor(props) {
    super(props);
    this.theme = createMuiTheme(Environment.theme);
  }

  render() {
    return (
      <CssBaseline>
        <Suspense fallback={<div>Loading</div>}>
          <MuiThemeProvider theme={this.theme}>
            <Container>
              <Todo />
            </Container>
          </MuiThemeProvider>
        </Suspense>
      </CssBaseline>
    );
  }
}

export default App;
