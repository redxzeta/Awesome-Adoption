import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/layout/NavigationBar";

export default function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Container>
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
      </Container>
    </Fragment>
  );
}
