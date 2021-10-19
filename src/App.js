import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/home/Home";
import NavigationBar from "./components/layout/NavigationBar";
import "./App.css";
import Pets from "./components/pets/Pets";
import PetType from "./components/pets/PetType";
import PetInfo from "./components/pets/PetInfo";
import Footer from "./components/layout/Footer";
import About from "./components/about/About";
import Resources from "./components/resources/Resources";
import NotFound from "./components/NotFound/NotFound";
/*  eslint-disable */
import jwt_decode from "jwt-decode";
/*  eslint-enable */
import Donate from "./components/donate/Donate";
import TokenContext from "./context/TokenContext";

export default function App() {
  const [token, setToken] = useState("");
  const [Authenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    const fetchFunction = () => {
      fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=ceDugyUR6mG2Ffsxnqbpx81oLjAv6rZllCBZ0xzWdYJGFWRAj9&client_secret=Xe9hBtgN8IBuDYD9lgN33WQp4jd4dvCRIqMUH0wB",
        // body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`,
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          setToken(data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (!localStorage.getItem("token")) {
      fetchFunction();
    } else {
      const decodedToken = jwt_decode(localStorage.getItem("token"));

      const currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        fetchFunction();
      } else {
        setToken(localStorage.getItem("token"));
      }
    }

    setAuthenticated(true);
  }, []);

  return (
    <Fragment>
      <TokenContext.Provider value={token}>
        <Router>
          <NavigationBar token={token} />
          <Container className="pawhub">
            <Switch>
              <Route path="/animal/:id">{Authenticated && <PetInfo />}</Route>
              <Route path="/pets/:type">{Authenticated && <PetType />}</Route>
              <Route path="/pets">{Authenticated && <Pets />}</Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/resources">
                <Resources />
              </Route>
              <Route path="/donate">
                <Donate />
              </Route>

              <Route path="/" exact>
                {" "}
                {Authenticated && <Home />}
              </Route>

              <Route path="/404">
                <NotFound />
              </Route>

              <Redirect to="/404" />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </TokenContext.Provider>
    </Fragment>
  );
}
