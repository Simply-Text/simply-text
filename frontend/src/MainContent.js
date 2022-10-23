import React, { useContext } from "react";
import { FirebaseApp } from "firebase/app";
import CamPreview from "./components/CamPreview";
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthContext } from "./components/AuthProvider";

function MainContent() {
  console.log(useContext(AuthContext));
  const { currentUser } = useContext(AuthContext);

  return !!currentUser ? (
    <Routes>
      <Route exact path="/search" element={<Search />}></Route>
      <Route exact path="/capture" element={<CamPreview />}></Route>
    </Routes>
  ) : (
    <Link to="/login">login</Link>
  );
}

export default MainContent;
