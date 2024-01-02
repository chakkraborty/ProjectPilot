import React from "react";
import "./FailureToast.css";

const FailureToast = ({ message }) => {
  return <div className="failure-toast-wrapper">{message}</div>;
};

export default FailureToast;
