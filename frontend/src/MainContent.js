import React, { useContext } from "react";
import { FirebaseApp } from "firebase/app";
import CamPreview from "./components/CamPreview";
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Link,
  redirect,
  Route,
  Routes,
} from "react-router-dom";

import { AuthContext } from "./components/AuthProvider";

function MainContent() {
  const { currentUser } = useContext(AuthContext);

  console.log(window.location.pathname);

  return !!currentUser ? (
    <>
    <Routes>
      <Route exact path="/search" element={<Search />}></Route>
      <Route exact path="/capture" element={<CamPreview />}></Route>
    </Routes>
    </>
  ) : (window.location.pathname === "/login") ? (
    null
  ) : (<Link className="login" to="/login">login</Link>);
}

export default MainContent;
