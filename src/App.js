import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/pets">
          <h2>pets</h2>
        </Route>
        <Route path="/">
          <h1>HOME</h1>
        </Route>
      </Switch>
    </Router>
  );
}
