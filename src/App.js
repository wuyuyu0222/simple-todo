import React, { Component, Suspense } from 'react';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { environment } from './environment';
import { store } from './App-Store';
import Container from './components/layouts/Container';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.theme = createMuiTheme(environment.theme);
  }

  render() {
    return (
      <CssBaseline>
        <Suspense fallback={<div>Loading</div>}>
          <MuiThemeProvider theme={this.theme}>
            <BrowserRouter>
              <Provider store={store}>
                <Container>
                </Container>
              </Provider>
            </BrowserRouter>
          </MuiThemeProvider>
        </Suspense>
      </CssBaseline>
    );
  }
}

export default App;
