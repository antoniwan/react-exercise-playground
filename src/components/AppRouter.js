import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Sieve_of_Eratosthenes from "../algorithms/sieve-of-eratosthenes";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/algorithms/sieve-of-eratosthenes"
            exact
            component={Sieve_of_Eratosthenes}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
