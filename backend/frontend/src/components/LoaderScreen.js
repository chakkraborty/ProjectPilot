import React from "react";
import "./LoaderScreen.css";
import Logo from "./logonew.png";
import CircularProgress from "@mui/material/CircularProgress";
const LoaderScreen = () => {
  return (
    <div className="loader-screen-div-wrapper">
      <div className="loader-screen-top-wrapper">
        <div className="display-flex">
          <img src={Logo} className="loader-screeen-top-logo" />
          <p className="loader-screen-name-header">Project Pilot</p>
        </div>
        <CircularProgress className="loader-screen-loader" />
      </div>
    </div>
  );
};

export default LoaderScreen;
