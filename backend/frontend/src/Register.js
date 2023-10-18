import React, { useEffect } from "react";
import "./Register.css";
import { useState } from "react";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Logo5 from "./components/Logo5.png";
import LoadingPage from "./components/LoadingPage";
import Toast from "./Toast";

const Register = () => {
  let currId = localStorage.getItem("_id");
  if (currId) {
    navigate("/home");
  }

  const [loaderScreen, setLoaderScreen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(0);
  function linkToLogin() {
    navigate("/login");
  }

  function errorSetter() {
    setError(0);
  }

  function errorDisplay(msg) {
    setError(1);
    setErrorMessage(msg);
    setTimeout(errorSetter, 2000);
  }

  async function registerHandler() {
    try {
      if (!password || !cnfpassword || !email || name) {
        errorDisplay("Please fill up all the fields !");
        return;
      }

      if (password !== cnfpassword) {
        setErrorMessage("Passwords do not match !");
        errorDisplay("Passwords do not match !");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(1);
      let a = await axios.post(
        "/api/register",
        { name, email, password },
        config
      );

      // console.log(a.data);

      localStorage.setItem("name", a.data.name);
      localStorage.setItem("_id", a.data._id);
      setLoading(0);
    } catch (error) {
      errorDisplay(error.response.data.message);
      setLoading(0);
    }
  }

  useEffect(() => {
    let a = localStorage.getItem("_id");
    if (a) {
      setLoaderScreen(true);
      navigate("/home");
    }
  }, []);

  return (
    <div className="register-wrapper">
      {loaderScreen ? <LoadingPage /> : <></>}
      {!error ? <></> : <Toast message={errorMessage} />}

      <img src={Logo5} className="register-page-logo" />

      <div className="register-page-subwrapper">
        <p className="register-title">Create your account </p>
        <input
          className="register-input"
          placeholder="User name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          className="register-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="register-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Confirm password"
          type="password"
          className="register-input"
          onChange={(e) => setCnfPassword(e.target.value)}
        />

        <div className="register-button" onClick={registerHandler}>
          {loading ? <CircularProgress size={25} /> : <p>Register</p>}
        </div>

        <p className="register-page-link color-c5cfd6">
          Already have an account ?{" "}
          <span className="register-page-text" onClick={linkToLogin}>
            Log in
          </span>
        </p>
        <p className="register-page-text-wrapper color-c5cfd6">
          By registering in you accept our
          <span className="register-page-text">Privacy Policy</span>
          and <span className="register-page-text">Terms of Service</span>.
        </p>
      </div>
    </div>
  );
};

export default Register;
