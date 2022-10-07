import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
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
      //loading screen
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
              placeholder="Password"
            />
            <Link to="/reset">Forgot Password</Link>
          </div>
        </div>
        <div className="google-auth"></div>
        <div className="facebook-auth"></div>
      </div>
    </div>
  );
}

export default Login;
