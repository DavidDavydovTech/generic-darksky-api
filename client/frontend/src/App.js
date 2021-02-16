
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

// Components
import Home from './components/home';
import Forecast from './components/forecast';

// Vars
const history = createBrowserHistory({forceRefresh:true});

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/forecast">
          <Forecast />
        </Route>
        <Route exact path="*">
          <h1 className="title">404 Not Found</h1>
        </Route>
      </Switch>
    </Router>
  )
};

// export default hot(App);
export default App;
