import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProjectList from "./PorjectList";
import SessionError from "./SessionError";
import axios from "axios";
import SuccessToast from "../toast/SuccessToast";
import LoaderScreen from "./LoaderScreen";

const Home = () => {
  const [showLoading, setShowLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function showLoadingTrigger() {
    setShowLoading(true);
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }
  // if (!token) {
  //   showLoadingTrigger();
  // }

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSuccessMessageTimeout = () => {
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  function successMessageFunction(incomingMessage) {
    setSuccessMessage(incomingMessage);

    setShowSuccessMessage(true);

    handleSuccessMessageTimeout();
  }

  function triggerProjectCreated() {
    successMessageFunction("Success! New project created!");
  }
  const [showError, setShowError] = useState(false);

  function showErrorTrigger() {
    setShowError(true);
  }
  async function fetchProjects() {
    try {
      if (!token) {
        showLoadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let userId = await localStorage.getItem("_id");
      console.log(userId);

      let a = await axios.post(
        "/api/getProjects",
        { userId, token: localStorage.getItem("token") },
        config
      );
      console.log("this occured");

      if (a.data) {
        // console.log(a.data);
      }
      if (a) {
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }
  useEffect(() => {
    fetchProjects();
    if (!token) {
      showLoadingTrigger();
    } // if (!token) {
  }, []);
  return (
    <div>
      {showError ? <SessionError /> : <></>}
      {showLoading ? <LoaderScreen /> : <></>}

      <Navbar />
      {showSuccessMessage ? <SuccessToast message={successMessage} /> : <></>}
      <div className="project-list-home-wrapper">
        <ProjectList
          triggerProjectCreated={triggerProjectCreated}
          showLoadingTrigger={showLoadingTrigger}
          showErrorTrigger={showErrorTrigger}
        />
      </div>
    </div>
  );
};

export default Home;
