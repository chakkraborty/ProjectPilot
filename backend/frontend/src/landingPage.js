import React from "react";
import "./landingStyles.css";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { blue, blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  function navLoginPage() {
    navigate("/login");
  }
  function navRegisterPage() {
    navigate("/register");
  }

  return (
    <div className="landingContainer">
      <div className="landingBox">
        <GroupWorkIcon className="landingIcon" sx={{ fontSize: 60 }} />
        <p className="landing-page-title">
          Welcome on board fellow developers!
        </p>
        <p className="landing-page-sub-title">
          Login with you account to continue :-)
        </p>
        <div className="landing-bottom-wrapper">
          <div className="landing-page-button" onClick={navLoginPage}>
            Log in
          </div>
          <div className="landing-page-button" onClick={navRegisterPage}>
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
