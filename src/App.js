import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NavigationBar from "./components/layout/NavigationBar";
import "./App.css";
import Pets from "./components/pets/Pets";
import PetType from "./components/pets/PetType";
import PetInfo from "./components/pets/PetInfo";
import Footer from "./components/layout/Footer";
import About from "./components/about/About";
import Resources from "./components/resources/Resources";
import Tips from "./components/tips/Tips";
import Stories from "./components/stories/Stories";
import NotFound from "./components/NotFound/NotFound";
import Donate from "./components/donate/Donate";
import Register from "./components/accounts/Register";
import { supabase } from "./utils/SupaBaseUtils";
import SLogin from "./components/accounts/SLogin";
import { Provider } from "react-supabase";
import { AuthProvider, useAuth } from "./context/SupaContext";
import ForgotPassword from "./components/accounts/ForgotPassword";
import PetAuthProvider, { usePetAuth } from "./context/TokenContext";
import ResetPassword from "./components/accounts/settings/resetPassword";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./components/accounts/profile/Profile";
import LoaderComponent from "./utils/LoaderComponent";

export default function App() {
  return (
    <Fragment>
      <PetAuthProvider>
        <Provider value={supabase}>
          <AuthProvider>
            <Router>
              <NavigationBar />
              <Container fluid className="pawhub">
                <Routes>
                  <Route path="animal/:id" element={<PetInfo />} />
                  <Route
                    path="pets/:type"
                    element={
                      <PetLoading>
                        <PetType />
                      </PetLoading>
                    }
                  />
                  <Route path="pets" element={<Pets />} />
                  <Route path="about" element={<About />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="tips" element={<Tips />} />
                  <Route path="donate" element={<Donate />} />
                  <Route path="stories" element={<Stories />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<SLogin />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="reset-password"
                    element={
                      <PrivateRoute>
                        <ResetPassword />{" "}
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <SupaLoading>
                        {" "}
                        <Profile />{" "}
                      </SupaLoading>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <PetLoading>
                        {" "}
                        <Home />{" "}
                      </PetLoading>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Container>
              <Footer />
            </Router>
          </AuthProvider>
        </Provider>
      </PetAuthProvider>
    </Fragment>
  );
}

const PetLoading = ({ children }) => {
  const { loading, errors } = usePetAuth();

  return (
    <LoaderComponent isLoading={loading} serverError={errors}>
      {children}
    </LoaderComponent>
  );
};
const SupaLoading = ({ children }) => {
  const { isLoading, error } = useAuth();
  return (
    <LoaderComponent isLoading={isLoading} serverError={error}>
      {children}
    </LoaderComponent>
  );
};
