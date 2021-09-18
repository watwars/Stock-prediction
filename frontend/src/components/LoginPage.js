import React, { useState } from "react";
import { Link } from "react-router-dom";
import { encrypt } from "react-crypt-gsm";
import { authRequests } from "../helpers/requests";
import ErrorMessage from "./ErrorMessage";
import { convertToString, checkResponse } from "../helpers/utils";
import { useHistory } from "react-router";

import "../css/auth.css";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, SetErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length === 0 || username.length === 0) {
      SetErr("Missing Input");
      return;
    }
    const encrypted = encrypt(password).tag;
    const encryptedPw = [...encrypted];
    const reqBody = {
      username,
      password: convertToString(encryptedPw),
    };
    console.log(reqBody);
    const reqUrl = "/api/v1/login";
    authRequests(reqUrl, reqBody).then((response) => {
      console.log(response);
      checkResponse(response, reqBody, history);
    });

    // here
    // needs logic that checks successful/unsuccessful login

    // if successful
    // history.push("/dashboard")

    // else
    // show error message
  };

  return (
    <div className="authGroup">
      <h1>Log In</h1>
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
        <input type="submit" />
      </form>
      <div>
        <span>Create a new account?</span>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
