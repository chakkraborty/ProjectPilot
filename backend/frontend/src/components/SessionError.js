import React from "react";
import "./SessionError.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import LoaderScreen from "./LoaderScreen";
const SessionError = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [loadScreen, setLoadScreen] = useState(false);
  const handleTimeout = () => {
    setTimeout(() => {
      setLoadScreen(true);
      handleTimeoutLoader();
    }, 2000);
  };
  const handleTimeoutLoader = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  function navigateToLogin() {
    setLoader(true);
    localStorage.removeItem("_id");
    localStorage.removeItem("name");

    localStorage.removeItem("email");

    localStorage.removeItem("token");
    handleTimeout();
  }

  return (
    <div className="session-error-wrapper">
      {loadScreen ? <LoaderScreen /> : <></>}
      <div className="session-error-div session-error-div-show">
        {/* <div className="session-error-circle"></div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#f15b50"
          class="bi bi-exclamation-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
        </svg>
        <div className="session-error-right-col">
          <div className="session-error-text-1">
            Your session has expired, invalid token found.
          </div>
          <div className="session-error-text-2">
            Please log in again to continue using the app.
          </div>
          <div
            className="session-error-login-button"
            onClick={() => navigateToLogin()}
          >
            {loader ? (
              <CircularProgress size={15} className="session-error-loader" />
            ) : (
              <></>
            )}
            <p>Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionError;
