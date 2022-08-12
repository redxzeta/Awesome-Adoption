import NotFound from "components/NotFound/NotFound";
import FooterMenu from "components/layout/Footer";
import NavigationBar from "components/layout/NavigationBar";
import PetInfo from "components/pets/PetInfo";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-supabase";

import "./App.css";
import About from "./components/about/About";
import ForgotPassword from "./components/accounts/ForgotPassword";
import Register from "./components/accounts/Register";
import SLogin from "./components/accounts/SLogin";
import Profile from "./components/accounts/profile/Profile";
// import ResetPassword from "./components/accounts/settings/resetPassword";
import Settings from "./components/accounts/settings/Settings";
import Home from "./components/home/Home";
import Organizations from "./components/organizations/Organizations";
import Favorites from "./components/pets/Favorites";
import PetType from "./components/pets/PetType";
import Pets from "./components/pets/Pets";
import Resources from "./components/resources/Resources";
import Tips from "./components/tips/Tips";
import { AuthProvider } from "./context/SupaContext";
import PetAuthProvider from "./context/TokenContext";
import { supabase } from "./utils/SupaBaseUtils";

export default function App() {
  return (
    <Fragment>
      <PetAuthProvider>
        <Provider value={supabase}>
          <AuthProvider>
            <NavigationBar />
            <Routes>
              <Route path="animal/:id" element={<PetInfo />} />
              <Route path="pets/:type" element={<PetType />} />
              <Route path="pets" element={<Pets />} />
              <Route path="about" element={<About />} />
              <Route path="resources" element={<Resources />} />
              <Route path="tips" element={<Tips />} />
              <Route path="organizations" element={<Organizations />} />
              {/* <Route path="stories" element={<Stories />} /> */}
              <Route path="favorites" element={<Favorites />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<SLogin />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="settings" element={<Settings />} />
              {/* <Route
                path="reset-password"
                element={
                  <PrivateRoute>
                    <ResetPassword />
                  </PrivateRoute>
                }
              /> */}
              <Route path="profile/:name" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FooterMenu />
          </AuthProvider>
        </Provider>
      </PetAuthProvider>
    </Fragment>
  );
}
