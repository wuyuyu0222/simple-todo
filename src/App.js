import React, { Component, Suspense } from 'react';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Environment } from './environment';
import { store } from './utils/store';
import Container from './layouts/Container';
import Topbar from './layouts/Topbar';
import Todo from './components/Todo/Todo';
import Login from './components/authorize/Login';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.theme = createMuiTheme(Environment.theme);
    this.state = store.getState();
    this.unSub = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  render() {
    const { isAuthorized } = this.state;
    const RenderChild = () => {
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
    return (
      <CssBaseline>
        <Suspense fallback={<div>Loading</div>}>
          <MuiThemeProvider theme={this.theme}>
            <BrowserRouter>
              <Provider store={store}>
                <Container>
                  <RenderChild />
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
