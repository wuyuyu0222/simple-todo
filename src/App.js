import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import './App.scss';
import Container from './layouts/Container';
import Todo from './components/Todo/Todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.theme = createMuiTheme({
      palette: {
        primary: { main: '#212121' },
        secondary: { main: '#F44336' }
      }
    });
  }
  render() {
    return (
      <CssBaseline>
        <Router>
          <Suspense fallback={<div>Loading</div>}>
            <MuiThemeProvider theme={this.theme}>
              <Container>
                <Todo />
              </Container>
            </MuiThemeProvider>
          </Suspense>
        </Router>
      </CssBaseline>
    );
  }
}

export default App;
