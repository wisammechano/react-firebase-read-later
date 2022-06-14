import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";


function Copyright(props) {
  return (
    <footer style={{ textAlign: "center", marginTop: 20 }}>
      {"Copyright © "}
      <Link to="/">My App</Link> {new Date().getFullYear()}
      {"."}
    </footer>
  );
}

export default function Login() {
  // @TODO: Use the sign in hook below
  const [login, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [persisted_user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user || persisted_user) {
      navigate("/");
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // @TODO: Login the user

    login(email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        gap: "10px",
        margin: "0 auto",
      }}
    >
      <h2>Login</h2>
      <p
        style={{
          color: "tomato",
          visibility: error ? true : false,
          minHeight: 20,
        }}
      >
        {error?.message}
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="email"
          required
          id="email"
          placeholder="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <input
          required
          name="password"
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          Login
        </button>
        <div>
          <a href="#later" variant="body2">
            Forgot password?
          </a>
        </div>
        <div>
          <Link to="/register">{"Don't have an account? Register"}</Link>
        </div>
      </form>
      <Copyright />
    </div>
  );
}
