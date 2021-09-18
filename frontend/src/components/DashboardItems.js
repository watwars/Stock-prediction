import React from "react";
import CircularProgess from "@mui/material/CircularProgress";

import "../css/Dashboard.css";
import { useHistory } from "react-router";

export const Header = ({ username }) => {
  const history = useHistory();
  return (
    <div className="header">
      <div>Welcome back, {username}!</div>
      <div
        onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}
        style={{ cursor: "pointer" }}
      >
        Sign Out
      </div>
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1>Loading</h1>
      <br />
      <CircularProgess />
    </div>
  );
};
