
import React from "react";
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { hot } from 'react-hot-loader/root';

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route path="/forecast">
            Forecast
          </Route>
          <Route exact path="/">
            Home
          </Route>
          <Route path="*">
            404
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default hot(App);
