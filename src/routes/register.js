import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);

function Copyright(props) {
  return (
    <footer style={{ textAlign: "center", marginTop: 20 }}>
      {"Copyright © "}
      <Link to="/">My App</Link> {new Date().getFullYear()}
      {"."}
    </footer>
  );
}

export default function Register() {
  // @TODO: use the register hook below
  const [register, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [persisted_user] = useAuthState(auth);

  const [validationError, setValidationError] = useState();

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
    const confirmPassword = data.get("confirm-password");
    if (password !== confirmPassword) {
      setValidationError("Passwords don't match");
    } else {
      setValidationError();

      // @TODO: Register the user
      register(email, password);
    }
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
      <h2>Register</h2>
      <p
        style={{
          color: "tomato",
          visibility: error || validationError ? true : false,
          minHeight: 20,
        }}
      >
        {validationError || error?.message}
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
          autoComplete="new-password"
        />

        <input
          required
          name="confirm-password"
          placeholder="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
        />

        <button type="submit" disabled={loading}>
          Create an account
        </button>

        <div>
          <Link to="/login">{"Already registered? Login"}</Link>
        </div>
      </form>
      <Copyright />
    </div>
  );
}
