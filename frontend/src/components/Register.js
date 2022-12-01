import React from "react";
import { useState } from "react";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../utils/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="register_box">
      <div className="name-box">
        <i className="nameImage"></i>
        <input
          className="login-textbox"
          type="text"
          aria-label="Name field"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="email-box">
        <i className="emailImage"></i>
        <input
          className="login-textbox email_textbox"
          type="text"
          aria-label="Username field"
          name="username"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail address"
        />
      </div>
      <div className="password-box password-textbox">
        <i className="passwordImage"></i>
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

      <button className="button"
        onClick={() => {
          return registerWithEmailAndPassword(name, email, password);
        }}
      >
        Register
      </button>
      <a
        className="btn btn-outline-dark"
        role="button"
        onClick={() => signInWithGoogle()}
        href="/register"
      >
        <img
          width="20px"
          alt="Google sign-in"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        />
        Login with Google
      </a>
    </div>
  );
}

export default Register;
