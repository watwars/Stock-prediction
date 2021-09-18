import React from "react";

const ErrorMessage = ({ message }) => {
  return <div className="errorMessage alert alert-danger">{message}</div>;
};

export default ErrorMessage;
