import React from "react";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import Logo5 from "./components/Logo5.png";

const Login = () => {
  const [error, setError] = useState(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  function errorSetter() {
    setError(0);
    console.log("i am this");
  }

  function errorDisplay() {
    setError(1);

    setTimeout(errorSetter, 2000);
  }

  const navigate = useNavigate();

  function linkToRegister() {
    navigate("/register");
  }

  async function loginHandler() {
    try {
      setLoading(1);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const a = await axios.post("/api/login", { password, email }, config);

      if (a) {
        localStorage.setItem("name", a.data.name);
        localStorage.setItem("_id", a.data._id);
        localStorage.setItem("email", a.data.email);
        console.log(a.data);
        setLoading(0);
        navigate("/home");
      }
    } catch (err) {
      setLoading(0);

      setErrorMessage(err.response.data.message);
      console.log(err.response.data.message);
      errorDisplay();
    }
  }

  useEffect(() => {
    let a = localStorage.getItem("_id");
    if (a) navigate("/home");
  }, []);

  return (
    <div className="register-wrapper">
      {!error ? (
        <Alert severity="error" className="error hidden" variant="filled">
          This is an error alert — check it out!
        </Alert>
      ) : (
        <Alert severity="error" className="error" variant="filled">
          {errorMessage}
        </Alert>
      )}
      <img src={Logo5} className="register-page-logo" />
      <p className="register-title">Welcome Back !</p>

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

      <div className="register-button" onClick={loginHandler}>
        {loading ? <CircularProgress size={25} /> : <p>Log in</p>}
      </div>

      <p className="register-page-link color-c5cfd6">
        Don't have an account ?{" "}
        <span className="register-page-text" onClick={linkToRegister}>
          Sign up
        </span>
      </p>

      <p className="register-page-text-wrapper color-c5cfd6">
        By logging in you accept our
        <span className="register-page-text">Privacy Policy</span>
        and <span className="register-page-text">Terms of Service</span>.
      </p>
    </div>
  );
};

export default Login;
