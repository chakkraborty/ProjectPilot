import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProjectList from "./PorjectList";
import SessionError from "./SessionError";
import axios from "axios";

const Home = () => {
  const [showError, setShowError] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/");
  }
  async function fetchProjects() {
    try {
      const config = {
        headers: {
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
  }, []);
  return (
    <div>
      {showError ? <SessionError /> : <></>}

      <Navbar />
      <div className="project-list-home-wrapper">
        <ProjectList />
      </div>
    </div>
  );
};

export default Home;
