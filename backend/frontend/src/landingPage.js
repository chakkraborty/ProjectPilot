import React from "react";
import "./landingStyles.css";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { blue, blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Logo5 from "./components/Logo5.png";
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
      <div className="landing-page-left-wrapper">
        <p className="landing-page-bold">Empowering Collaboration.</p>
        <p>
          Unleashing Potential: Your Open Source Solution for Seamless Project
          Management!
        </p>
      </div>
      <div className="landing-page-right-wrapper">
        <div className="landing-page-top-wrapper">
          <p className="landing-page-title">Get started</p>
          <div className="landing-page-buttons-wrapper">
            <div className="landing-page-button" onClick={() => navLoginPage()}>
              Log in
            </div>
            <div
              className="landing-page-button landing-page-right-button"
              onClick={() => navRegisterPage()}
            >
              Sign up
            </div>
          </div>
        </div>

        <div className="landing-page-lower-wrapper">
          <div className="landing-page-logo-wrapper">
            <img src={Logo5} className="landing-page-logo-image" />
            <p>ProjectPilot</p>
          </div>

          <p className="landing-page-bottom-text">
            Terms of Use | Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
