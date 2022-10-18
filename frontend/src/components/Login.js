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
            <div className="email-box">
              <label name="username" htmlFor="username">
                Email:{" "}
              </label>
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
            </div>
            <div className="password-box">
              <label name="password" htmlFor="password">
                {" "}
                Password:{" "}
              </label>
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
            </div>

            <button onClick={() => logInWithEmailAndPassword(email, password)}>
              Login
            </button>

            <Link to="/reset">Forgot Password</Link>
          </div>
          {
            // need to implement a register page
          }
        </div>
        <div className="google-auth">
          <a
            className="btn btn-outline-dark"
            href="/users/googleauth"
            role="button"
            onClick={signInWithGoogle}
          >
            <img
              width="20px"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Login with Google
          </a>
        </div>
        <div className="register-button">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
        <div className="facebook-auth"></div>
      </div>
    </div>
  );
}

export default Login;
