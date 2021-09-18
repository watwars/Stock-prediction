import React, { useState } from "react";
import { encrypt } from "react-crypt-gsm";
import { authRequests } from "../helpers/requests";
import { convertToString, checkResponse } from "../helpers/utils";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router";

import "../css/auth.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [err, SetErr] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password.length === 0 ||
      rpassword.length === 0 ||
      username.length === 0
    ) {
      SetErr("Missing Input");
      return;
    } else if (password !== rpassword) {
      SetErr("Passwords do not match");
      return;
    }
    const encrypted = encrypt(password).tag;
    const encryptedPw = [...encrypted];
    const reqBody = {
      username,
      password: convertToString(encryptedPw),
    };
    const reqUrl = "/api/v1/signup";
    authRequests(reqUrl, reqBody).then((response) => {
      console.log(response);
      let msg = checkResponse(response, reqBody, history);
      if (msg) {
        SetErr(msg);
      }
    });
  };

  return (
    <div className="authGroup">
      <h1>Sign Up</h1>
      {err !== "" ? <ErrorMessage message={err} /> : <></>}
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          placeholder="Username..."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password..."
        />
        <input
          type="password"
          value={rpassword}
          onChange={(e) => setRPassword(e.target.value)}
          className="form-control"
          placeholder="Repeat Password..."
        />
        <input type="submit" />
      </form>
      <div>
        <span>Already have an account?</span>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
