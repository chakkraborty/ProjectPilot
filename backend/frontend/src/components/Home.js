import React from "react";
import "./Navbar.css";
import Navbar from "./Navbar";
import ProjectList from "./PorjectList";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="project-list-home-wrapper">
        <ProjectList />
      </div>
    </div>
  );
};

export default Home;
