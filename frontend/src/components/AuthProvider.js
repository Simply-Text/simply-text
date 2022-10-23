import { useContext, useState, useEffect } from "react";
import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function signUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signOutFromApp() {
    return signOut(auth);
  }

  const values = {
    currentUser,
    signIn,
    signUpWithEmail,
    signOutFromApp,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
