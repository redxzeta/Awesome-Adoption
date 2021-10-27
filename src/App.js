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
import Register from "./components/accounts/Register";
import { supabase } from "./utils/SupaBaseUtils";
import SLogin from "./components/accounts/SLogin";
import { Provider } from "react-supabase";
import { AuthProvider } from "./context/SupaContext";
import ForgotPassword from "./components/accounts/ForgotPassword";
import ResetPassword from "./components/accounts/settings/resetPassword";

export default function App() {
  const [token, setToken] = useState("");
  const [Authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const fetchFunction = () => {
      fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`,
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
        <Provider value={supabase}>
          <AuthProvider>
            <Router>
              <NavigationBar token={token} />
              <Container className="pawhub">
                <Switch>
                  <Route path="/animal/:id">
                    {Authenticated && <PetInfo />}
                  </Route>
                  <Route path="/pets/:type">
                    {Authenticated && <PetType />}
                  </Route>
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
                  <Route path="/register" component={Register} />
                  <Route exact path="/login" component={SLogin} />
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                  <Route
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                  />
                  <Route path="/" exact>
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
          </AuthProvider>
        </Provider>
      </TokenContext.Provider>
    </Fragment>
  );
}
