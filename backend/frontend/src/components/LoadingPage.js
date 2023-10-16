import React from "react";
import "./LoadingPage.css";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <div className="loading-page-wrapper">
      <CircularProgress size={25} />
    </div>
  );
};

export default LoadingPage;
