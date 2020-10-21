import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NavigationBar from "./components/layout/NavigationBar";
import axios from "axios";
import "./App.css";
import Pets from "./components/pets/Pets";
import PetType from "./components/pets/PetType";
import PetInfo from "./components/pets/PetInfo";
export default function App() {
  console.log(process.env.REACT_APP_PETFINDER_KEY);
  const [token, setToken] = useState("");
  useEffect(() => {
    axios
      .post(
        "https://api.petfinder.com/v2/oauth2/token",
        `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`
      )
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Fragment>
      <Router>
        <NavigationBar token={token} />
        <Container className="pawhub">
          <Switch>
            {" "}
            <Route path="/animal/:id">
              {token && <PetInfo token={token} />}
            </Route>
            <Route path="/pets/:type">
              {token && <PetType token={token} />}
            </Route>
            <Route path="/pets">{token && <Pets token={token} />}</Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
}
