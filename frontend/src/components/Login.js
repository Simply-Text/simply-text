import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //loading screen?
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div>
      <div className="login-modal">
        <div className="email-auth">
          <div className="login-field">
            <label name="username">Username</label>
            <input
              className="login-textbox"
              type="text"
              aria-label="Username field"
              name="username"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail address"
            />
            <label name="password"> Password</label>
            <input
              className="login-textbox"
              type="password"
              aria-label="Password field"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={() => logInWithEmailAndPassword(email, password)}>
              Login
            </button>
            <button
              className="login__btn login__google"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
            <Link to="/reset">Forgot Password</Link>
          </div>
          {
            // need to implement a register page
          }
        </div>
        <div className="google-auth"></div>
        <div className="facebook-auth"></div>
      </div>
    </div>
  );
}

export default Login;
